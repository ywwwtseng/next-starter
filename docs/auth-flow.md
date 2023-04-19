# Auth Flow

```js
// @ts-ignore
interface Window {
  google: any
  AppleID: any
}

enum TokenType {
  ID_TOKEN = 'id_token',
  ACCESS_TOKEN = 'access_token',
}

enum IdentityProvider {
  GOOGLE = 'google',
  APPLE = 'apple',
}

interface ITokenResponse {
  uid: string
  accessToken: string
  refreshToken: string
}

interface ICredential {
  identityProvider: IdentityProvider
  tokenType: TokenType
  token: string
}

type OnReceiveCredential = (credential: ICredential) => void;
type OnSignIn = (tokenResponse: ITokenResponse) => void;

interface IAuth {
  init: (signInButton: HTMLButtonElement, onReceiveCredential: OnReceiveCredential) => Promise<any>
}

function loadScript(id: string, src: string): Promise<HTMLScriptElement> {
  return new Promise((resolve) => {
    let script: HTMLScriptElement;
    
    if (document.getElementById(id)) {
      script = document.getElementById(id) as HTMLScriptElement;
      resolve(script);
    }

    script = document.createElement('script') as HTMLScriptElement;
    script.defer = true;
    script.async = true;
    script.src = src;
    script.id = id;
    script.onload = () => {
      resolve(script);
    };

    document.head.insertBefore(script, document.head.firstElementChild);
  });

}

class AuthApple implements IAuth {
  async init(signInButton: HTMLButtonElement, onReceiveCredential: OnReceiveCredential) {
    try {
      await loadScript('apple-client', '//appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js');

      if (window.AppleID) {
        window.AppleID.auth.init({
          clientId: 'app.popup.web',
          scope: 'name email',
          redirectURI:  window.location.origin,
          usePopup: true,
        });

        const onAppleSignInSuccessHandle = (event: any) => {
          onReceiveCredential({
            identityProvider: IdentityProvider.APPLE,
            tokenType: TokenType.ID_TOKEN,
            token: event.authorization.id_token,
          });

          removeEventListeners();
        };
        const onAppleSignInErrorHandle = (error: any) => {
        };

        const removeEventListeners = () => {
          document.removeEventListener('AppleIDSignInOnSuccess', onAppleSignInSuccessHandle);
          document.removeEventListener('AppleIDSignInOnFailure', onAppleSignInErrorHandle);
        };

        document.addEventListener('AppleIDSignInOnSuccess', onAppleSignInSuccessHandle);
        document.addEventListener('AppleIDSignInOnFailure', onAppleSignInErrorHandle);

        signInButton.addEventListener('click', () => {
          window.AppleID.auth.signIn();
        });

        return () => {
          removeEventListeners();
        };

      } else {
        throw 'Initialize Apple SignIn API Failed';
      }

    } catch (error) {

    }
  }
}

class AuthGoogle implements IAuth {
  async init(signInButton: HTMLButtonElement, onReceiveCredential: OnReceiveCredential) {
    try {
      await loadScript('google-client', 'https://accounts.google.com/gsi/client');

      window.google.accounts.id.initialize({
        client_id: '892483020907-dj97ppsbfai2b8q5v11d8ciji9mhnlu7.apps.googleusercontent.com',
        callback: (user: any) => onReceiveCredential({
          identityProvider: IdentityProvider.GOOGLE,
          tokenType: TokenType.ACCESS_TOKEN,
          token: user.credential,
        }),
      });

      window.google.accounts.id.renderButton(signInButton, {
        theme: 'outline',
        size: 'large',
        type: 'icon',
        width: '42',
        shape: 'circle',
      });

      window.google.accounts.id.prompt(notification => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          throw 'Initialize Google SignIn API Failed';
        }
      });

      return () => {};

    } catch(error) {
      throw 'Initialize Google SignIn API Failed';
    }

  }

  async onSignIn(credential: ICredential) {

  }
}

class Auth {
  google: AuthGoogle;
  apple: AuthApple;

  async addSignInListener(identityProvider: IdentityProvider, signInButton: HTMLButtonElement, onReceiveCredential: OnReceiveCredential) {
    if (identityProvider === IdentityProvider.GOOGLE) {

      this.google = new AuthGoogle();
      const removeSignInListener = await this.google.init(signInButton, onReceiveCredential);
      return removeSignInListener;

    } else if (identityProvider === IdentityProvider.APPLE) {

      this.apple = new AuthApple();
      const removeSignInListener = await this.apple.init(signInButton, onReceiveCredential);
      return removeSignInListener;

    }
  }


}

class AppAuth {
  auth: Auth;

  constructor() {
    this.auth = new Auth();
  }

  onReceiveCredential = (onSignIn: OnSignIn) => {
    return async (credential: ICredential) => {
      const url = `/api/sign_in/${credential.identityProvider}`;
      const data = credential.tokenType === TokenType.ACCESS_TOKEN
        ? { access_token: credential.token } 
        : { platform: 'web', code: credential.token };

      try {
        const response = await fetch(url, { method: 'POST', body: JSON.stringify(data) });
        const result = await response.json();
        const { user_id: uid, user_token: accessToken, refresh_token: refreshToken } = result.data || {};
        onSignIn({ uid, accessToken, refreshToken });
        
      } catch (error) {
        console.error(error);
      }

    }
  }

  async addSignInListener(identityProvider: IdentityProvider, signInButton: HTMLButtonElement, onSignIn: OnSignIn) {
    const removeSignInListener = await this.auth.addSignInListener(identityProvider, signInButton, this.onReceiveCredential(onSignIn));
    return removeSignInListener;
  }
  
}

/**
 *  Sample Code
 * 
 *  onSignIn(tokenResponse: ITokenResponse) {
 *    // after request sigin api and set current token, refresh token and current user base on cookies.
 *    // [POPO] access token exday is 6, POPO's refresh token exday is 24
 *    // Question: 使用者在 POPO 頁面閒置超過六天，會不會被登出？
 *  }
 * 
 *  function SignInContainer({ identityProvider, children, onSignIn, onError }) {
 *    const auth = useAuth(); // Context API
 *    const signInButtonRef = useRef(null);
 *    const isUnmounted = useRef(false);
 *    
 *    useEffect(() => {
 *      let removeSignInListener;
 * 
 *      const addSignInListener = async () => {
 *        try {
 *          removeSignInListener = await auth.addSignInListener(identityProvider, signInButtonRef.current, onSignIn);
 *          if (isUnmounted === true) removeSignInListener();
 *        } catch (error) {
 *          onError(error);
 *        }
 *      };
 * 
 *      return () => {
 *        isMounted.current = true;
 *        removeSignInListener?.();
 *      };
 *    }, []);
 * 
 *    return React.cloneElement(children, { ref: signInButtonRef });
 * 
 *  }
 *
 * 
 */
```