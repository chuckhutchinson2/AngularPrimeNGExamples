export interface WeatherData {
	base: string;
	clouds: CloudData;
	coord: WeatherCoordinate;
	cod: string;
	dt: number;
	id: number;
	main: WeatherMainData;
	name: string;
	sys: WeatherSysData;
	visibility: number;
	weather: Weather[];
	wind: Wind;
}

export interface CloudData {
	all: number;
}

export interface WeatherCoordinate {
	lat: number;
	lon: number;
}

export interface WeatherMainData {
	humidity: number;
	pressure: number;
	temp: number;
	temp_max: number;
	temp_min: number;
}

export interface WeatherSysData {
	    country: string;
        id: number;
        message: number;
        sunrise: number;
        sunset: number;
        type: number;
}

export interface Weather {
	description: string;
	icon: string;
	id: number;
	main: string;
}

export interface Wind {
	deg: number;
	speed: number;
}
