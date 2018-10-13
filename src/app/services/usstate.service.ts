import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { USStateData, Coordinate } from '../usstatedata.model';
import { USStateCountyData } from '../usstatecountydata.model';

@Injectable()
export class USStateService {

  	url = '/states.json';
  	countyDataUrl = '/states/';

    constructor(private http:HttpClient) {
    }

    load(): Observable<USStateData[]> {
        return this.http.get<USStateData[]>(this.url);
    }

    loadState(state): Observable<USStateCountyData[]> {
        return this.http.get<USStateCountyData[]>(this.countyDataUrl + state + '.json').pipe(map(data => this.createCounties(data)));
    }

    createCounties(data) {
    	var counties = [];

    	for(var i = 0; i < data.length; i++) {
  			counties.push(this.createCounty(data[i]));
    	}

    	return counties;
    }

    createGeometry(data) {
    	var geometry = [];

    	if (data) {
	    	var coordinates = data.split(" ");

	    	for (var i = 0; i < coordinates.length; i++) {
	    		var coordinate = coordinates[i].split(",");

	    		if (coordinate.length == 2) {
	    			var point = {
	    				lat: coordinate[1],
	    				lng: coordinate[0]
	    			};

	    			geometry.push(point);
	    		}
	    	}
	    }

    	return geometry;
    }

    createCounty(data) {
    	return  {
			CountyName: data['County Name'],
		    StateCounty: data['State-County'],
		    stateabbr: data['state abbr'],
		    StateAbbr: data['State Abbr.'],
		    geometry: this.createGeometry(data['geometry']),
		    value: data['value'],
		    GEO_ID: data['GEO_ID'],
		    GEO_ID2: data['GEO_ID2'],
		    GeographicName: data['Geographic Name'],
		    STATEnum: data['STATE num'],
		    COUNTYnum: data['COUNTY num'],
		    FIPSformula: data['FIPS formula'],
		    Haserror: data['Has error']
        };
    }
}