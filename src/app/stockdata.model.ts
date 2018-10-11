export interface StockData {
	quote: QuoteData;
	chart: ChartData[];
	news: NewsData[];
}

export interface NewsData {
	datetime: string;
	headline: string;
	image: string;
	related: string;
	source: string;
	summary: string;
	url: string;
}

export interface ChartData {
	change: number;
	changeOverTime: number;
	changePercent: number;
	close: number;
	date: string;
	high: number;
	label: string;
	low: number;
	open: number;
	unadjustedVolume: number;
	volume: number;
	vwap: number;
}

export interface QuoteData {
    avgTotalVolume: number;
    calculationPrice: string;
    change: number;
    changePercent: number;
    close: number;
    closeTime: number;
    companyName:  string;
    delayedPrice: number;
    delayedPriceTime: number;
    extendedChange: number;
    extendedChangePercent: number;
    extendedPrice: number;
    extendedPriceTime: number;
    high: number;
    iexAskPrice: number;
    iexAskSize: number;
    iexBidPrice: number;
    iexBidSize: number;
    iexLastUpdated: number;
    iexMarketPercent: number;
    iexRealtimePrice: number;
    iexRealtimeSize: number;
    iexVolume: number;
    latestPrice: number;
    latestSource:  string;
    latestTime: string;
    latestUpdate: number;
    latestVolume: number;
    low: number;
    marketCap: number;
    open: number;
    openTime: number;
    peRatio: number;
    previousClose: number;
    primaryExchange:  string;
    sector:  string;
    symbol:  string;
    week52High: number;
    week52Low: number;
    ytdChange: number;
}