export default class EpicEarth {
  static async makeEpicApiCall(userDateInput) {
    try {
      const response = await fetch(`https://epic.gsfc.nasa.gov/api/enhanced/date/${userDateInput}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}