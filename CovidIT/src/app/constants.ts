export const URL_BASE =  'https://api.covid19tracking.narrativa.com/api';
export const  REGION_URL_PART='/country/italy/region';
export const URL_FROM_PART='?date_from=';
export const URL_TO_PART='&date_to=';
export const URL = {
  REGION_FOR_GRAPHS: URL_BASE + REGION_URL_PART, // https://api.covid19tracking.narrativa.com/api/country/italy/region/
// es url finale:  https://api.covid19tracking.narrativa.com/api/country/italy/region/lombardia?date_from=2020-03-20&date_to=2020-03-22
  ITALY_FOR_GRAPHS: URL_BASE +'/country/italy' // https://api.covid19tracking.narrativa.com/api/country/italy
// es url finale:  https://api.covid19tracking.narrativa.com/api/country/italy?date_from=2020-03-20&date_to=2020-03-22
};
