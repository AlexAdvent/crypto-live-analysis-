from flask import Flask, render_template
from flask import jsonify
from flask import request
import requests
from flask import session

app = Flask(__name__)
app.secret_key = 'keynotknown'


@app.route('/')
def index():
    s = requests.Session()
    p = s.post("https://n00btrader.com/signal/app.system/api/auth", data={
        "username": 'deepuprajapti5@gmail.com',
        "password": "binomo123"
    })
    data = p.json()
    session['token'] = data['data']['token']
    # return render_template("dashboard.html", token=data['data']['token'])
    return render_template("index.html", count=1)

@app.route('/iframe/cryptoidx')
def render_cryptoidx():
    return render_template("cryptoidx.html")


@app.route('/iframe/altidx')
def render_altidx():
    return render_template("altidx.html")


@app.route('/iframe/eurusd')
def render_eurusd():
    return render_template("eurusd.html")


@app.route('/cryptoidx')
def cryptoidx():
    return render_template("CRYPTO-IDX.html")


@app.route('/altidx')
def altidx():
    return render_template("ALTCOIN.html")


@app.route('/eurusd')
def euridx():
    return render_template("EUR-USD.html")


@app.route('/api/getdata/updates/<name>/<date>', methods=['GET', 'POST'])
def get_update_data(name, date):
    url = 'https://n00btrader.com/signal/sig.' + name + '/api/data?type=json&last=1&token='+ session.get('token') +'&date=' + date
    data = requests.get(url)
    data = data.json()
    return data


@app.route('/api/getdata/loaddata/<name>/<date>', methods=['GET', 'POST'])
def load_data(name, date):
    url = 'https://n00btrader.com/signal/sig.' + name + '/api/data?type=json&token='+ session.get('token') +'&date=' + date
    print(url)
    data = requests.get(url)
    data = data.json()
    return data


if __name__ == "__main__":

    # app.config['SESSION_TYPE'] = 'filesystem'
    # session.init_app(app)
    app.run()
