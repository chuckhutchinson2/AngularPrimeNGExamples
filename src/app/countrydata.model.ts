export interface CountryData {
    alpha2Code: String;
    alpha3Code: String;
    altSpellings: String[];
    area: Number;
    borders: String[];
    callingCodes: Number[];
    capital: String;
    cioc: String;
    currencies: CurrencyData[];
	demonym: String;
	flag: String;
	gini: Number;
	languages: LanguageData[];
	latlng: Number[];
	name: String;
	nativeName: String;
	numericCode: Number;
	population: Number;
	region: String;
	regionalBlocs: RegionBlocData[];
    subregion: String;
    timezones: String[];
    topLevelDomain: String[];
    translations: TranslationData;
}

export interface CurrencyData {
    code: String;
    name: String;
    symbol: String;
}

export interface LanguageData {
    iso639_1: String;
    iso639_2: String;
    name: String;
    nativeName: String;
}

export interface RegionBlocData {
    acronym: String;
    name: String;
    otherAcronyms: [],
    otherNames: []
}

export interface TranslationData {
    br: String;
    de: String;
    es: String;
    fa: String;
    fr: String;
    hr: String;
    it: String;
    ja: String;
    nl: String;
    pt: String;
}

/*
    {
        "alpha2Code": "AF",
        "alpha3Code": "AFG",
        "altSpellings": [
            "AF",
            "Af\u0121\u0101nist\u0101n"
        ],
        "area": 652230.0,
        "borders": [
            "IRN",
            "PAK",
            "TKM",
            "UZB",
            "TJK",
            "CHN"
        ],
        "callingCodes": [
            "93"
        ],
        "capital": "Kabul",
        "cioc": "AFG",
        "currencies": [
            {
                "code": "AFN",
                "name": "Afghan afghani",
                "symbol": "\u060b"
            }
        ],
        "demonym": "Afghan",
        "flag": "https://restcountries.eu/data/afg.svg",
        "gini": 27.8,
        "languages": [
            {
                "iso639_1": "ps",
                "iso639_2": "pus",
                "name": "Pashto",
                "nativeName": "\u067e\u069a\u062a\u0648"
            },
            {
                "iso639_1": "uz",
                "iso639_2": "uzb",
                "name": "Uzbek",
                "nativeName": "O\u02bbzbek"
            },
            {
                "iso639_1": "tk",
                "iso639_2": "tuk",
                "name": "Turkmen",
                "nativeName": "T\u00fcrkmen"
            }
        ],
        "latlng": [
            33.0,
            65.0
        ],
        "name": "Afghanistan",
        "nativeName": "\u0627\u0641\u063a\u0627\u0646\u0633\u062a\u0627\u0646",
        "numericCode": "004",
        "population": 27657145,
        "region": "Asia",
        "regionalBlocs": [
            {
                "acronym": "SAARC",
                "name": "South Asian Association for Regional Cooperation",
                "otherAcronyms": [],
                "otherNames": []
            }
        ],
        "subregion": "Southern Asia",
        "timezones": [
            "UTC+04:30"
        ],
        "topLevelDomain": [
            ".af"
        ],
        "translations": {
            "br": "Afeganist\u00e3o",
            "de": "Afghanistan",
            "es": "Afganist\u00e1n",
            "fa": "\u0627\u0641\u063a\u0627\u0646\u0633\u062a\u0627\u0646",
            "fr": "Afghanistan",
            "hr": "Afganistan",
            "it": "Afghanistan",
            "ja": "\u30a2\u30d5\u30ac\u30cb\u30b9\u30bf\u30f3",
            "nl": "Afghanistan",
            "pt": "Afeganist\u00e3o"
        }
    },

*/    