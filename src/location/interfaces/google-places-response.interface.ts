export interface GooglePlacesResponse {
  status: string;
  error_message?: string;
  result: {
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  };
}

export type GooglePlaceResult = GooglePlacesResponse['result'];
