import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Ipayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  
  // Receber o token
  const authtoken = request.headers.authorization;
  
  // Validar se token está preenchido 
  if(!authtoken) {
    return response.status(401).end();
  }

  const [,token] = authtoken.split(" ")

  try {
    // Validar se token é valido
    const { sub } = verify( token , "eac1a2fdc79ecdf372719467bc68d4f7") as Ipayload;

    // Recuperar Informações do usuário
    request.user_id = sub;

    return next();
  } catch(err) {
    return response.status(401).end();
  }



}




