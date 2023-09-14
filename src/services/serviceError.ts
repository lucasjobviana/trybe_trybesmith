class ServiceError extends Error {
  public statusCode:number;

  private error400 = (errorMessage:string):number | undefined => {
    switch (errorMessage) {
      case 'name is required':
      case 'price is required':
        return 400;
      default: 
    }
  };

  private error422 = (errorMessage:string):number | undefined => {
    switch (errorMessage) {
      case '"name" must be a string':
      case '"price" must be a string':
      case '"name" length must be at least 3 characters long':
      case '"price" length must be at least 3 characters long':
        return 422;
      default: 
    }
  };

  public mapMsgToStatusCode = (errorMessage = ''):number | undefined => 
    this.error400(errorMessage) || this.error422(errorMessage);
    
  constructor(message:string, defaultStatusCode = 333) {
    super(message);
    this.statusCode = this.mapMsgToStatusCode(message) || defaultStatusCode;
  }
}

export default ServiceError;