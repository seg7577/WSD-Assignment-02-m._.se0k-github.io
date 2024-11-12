export const AuthService = {
    tryLogin: (email: string, password: string, saveToken = true): Promise<any> => {
      return new Promise((resolve, reject) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((user: any) => user.id === email && user.password === password);
  
        if (user) {
          if (saveToken) {
            localStorage.setItem('TMDb-Key', user.password);
          }
          resolve(user);
        } else {
          reject('Login failed');
        }
      });
    },
  
    tryRegister: (email: string, password: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        try {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const userExists = users.some((existingUser: any) => existingUser.id === email);
  
          if (userExists) {
            reject(new Error('User already exists'));
            return;
          }
  
          const newUser = { id: email, password };
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
  };
  