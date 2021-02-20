const axios = require('axios')
const cheerio = require('cheerio')

class StockInfo{
    constructor(stocks){
        this.setStocks(stocks)
    }

    getStocks(){
        return this.stocks
    }

    setStocks(stocks){
        if(stocks == undefined)
            this.stocks = null
        else if (Array.isArray(stocks)){
            if(stocks.length == 0)
                this.stocks = null
            else{
                stocks.forEach(stock => {
                    if(typeof(stock) != "string")
                        throw new TypeError(`Only type string and array of strings are supported, but found type ${typeof{stock}}`)                
                    if(stock.length == 0)
                        throw new TypeError(`Empty strings are not supported`)
                })
                this.stocks = stocks
            }
        }
        else{
            if(typeof(stocks) == "string"){
                if(stocks.length == 0)
                    throw new TypeError(`Empty strings are not supported`)
                this.stocks = [stocks]
            }
            else{
                throw new TypeError(`Only type string and array of strings are supported, but found type ${typeof{stocks}}`)
            }   
        }
        return this
    }

    getStockInfo(){
        let requestList = []
        this.stocks.forEach((stock) => {
            let url = `https://finance.yahoo.com/quote/${stock}/`
            let req = axios.get(url)
            requestList.push(req)
        })

        return Promise.all(requestList).then(responses => {
            let stockInfoAll = {}
            responses.forEach(response => {
                let stockName = response.config["url"].split("\/").reverse()[1]
                let stockInfo = {}
                let $ = cheerio.load(response.data)
                try {
                    stockInfo['price'] =  $('[data-reactid=50]').html().replace(" ", "")
                    let [changeAmount, changePercent] = $('span[data-reactid=51]').html().replace(/\(|\)|%/g, "").split(" ")
                    stockInfo['change-amount'] = changeAmount
                    stockInfo['change-percent'] = changePercent
                    stockInfo['price-at-previous-close'] =  $('[data-reactid=98]').html().replace(" ", "")
                    stockInfo['price-at-open'] =  $('[data-reactid=103]').html().replace(" ", "")
                }catch (e){
                    console.log(e.message)
                    return
                }
                stockInfoAll[stockName] = stockInfo
            })
                return stockInfoAll
        })
        
    }

}

// let s = new StockInfo(["amznhiyt", "aapl"])
// // // // s.print()
// s.getStockInfo().then((stockInfo) => console.log(stockInfo))
// let l = 1

module.exports = StockInfo