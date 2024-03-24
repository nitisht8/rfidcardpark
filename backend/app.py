from flask import Flask, request, jsonify
from flask_cors import CORS
import time
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import UniqueConstraint

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://parkadmin:arkhambatmobile@localhost:3306/cardpark'
db = SQLAlchemy(app)

class ParkingRates(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rate1 = db.Column(db.Integer, nullable=False)
    rate2 = db.Column(db.Integer, nullable=False)
    rate3 = db.Column(db.Integer, nullable=False)

    __table_args__ = (UniqueConstraint('id', name='_id_uc'),)

class CardTransactions(db.Model):
    transaction_id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.String(10), nullable=False)
    transaction_type = db.Column(db.String(10), nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    fee_charged = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"CardTransaction(id={self.id}, card_id='{self.card_id}', transaction_type='{self.transaction_type}', time='{self.time}', fee_charged={self.fee_charged})"

def InitializeRates():
    global rate1, rate2, rate3
    parking_rates = ParkingRates.query.first()
    rate1, rate2, rate3 = parking_rates.rate1, parking_rates.rate2, parking_rates.rate3

Cards = ['0009712668','0010733093','0009730426','0009767791','0009778699']
Parked = {}     

@app.route('/api/cardprocess', methods=['POST'])
def handle_scan():
    global rate1, rate2, rate3
    data = request.json  
    cardID = data.get('data')
    if cardID in Cards:
            if cardID not in Parked:
                now=time.localtime()
                Parked[cardID]=now
                entry_transaction = CardTransactions(card_id=cardID, transaction_type='entry', time=now, fee_charged=0)
                db.session.add(entry_transaction)
                db.session.commit()
                return jsonify(['entry',['{}'.format(time.strftime('%I:%M %p', now))]])
            else:
                entryTime = Parked[cardID]
                timeSpent=(time.time()-time.mktime(entryTime))/60
                if timeSpent<60:
                    fee=rate1
                elif timeSpent < 180:
                    fee=rate2
                else:
                    fee=rate3
                exit_transaction = CardTransactions(card_id=cardID, transaction_type='exit', time=time.localtime(), fee_charged=fee)
                db.session.add(exit_transaction)
                db.session.commit()
                Parked.pop(cardID)
                return jsonify(['exit',[time.strftime('%I:%M %p', time.localtime()),fee]])
    else:
         return jsonify('invalid')

@app.route('/api/datapipeline', methods=['GET'])
def sendData():
    data=CardTransactions.query.all()
    formatted = [{'Transaction ID':item.transaction_id,'Card':item.card_id,'Event':item.transaction_type,'Time':item.time,'Fee':item.fee_charged} for item in data]
    return jsonify(formatted)

@app.route('/api/admincontrol', methods=['POST'])
def AdminControl():
    d=request.json
    newRates=d.get('data')
    existing_rates = ParkingRates.query.first()
    existing_rates.rate1 = newRates[0]
    existing_rates.rate2 = newRates[1]
    existing_rates.rate3 = newRates[2]
    db.session.add(existing_rates)
    db.session.commit()
    InitializeRates()
    return jsonify('Data communication successful')

if __name__ == '__main__':
    with app.app_context():
        InitializeRates()
    app.run(debug=True)