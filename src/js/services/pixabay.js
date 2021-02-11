export default class Pixabay {
  static async makePixabayApiCall(userSearchInput) {
    try {
      const response = await fetch(`https://pixabay.com/api/?key=${process.env.API_KEY}&q=${userSearchInput}&image_type=photo`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}