import bcrypt from "bcrypt";

export function convertTextInHash(text: string) {
  return new Promise<String>((resolve, reject) => {
    bcrypt.hash(text, 10, (err, hash) => {
      if (err) {
        reject(err.message);
      }

      resolve(hash);
    });
  });

}

export function verify(text: string, hash: string) {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(text, hash, (err, match) => {
      if(err) {
        reject(err.message)
      }

      resolve(match)
    })
  })
}
