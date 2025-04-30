'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Types
type ThemeType = 'light' | 'dark' | 'system';
type LanguageType = 'en' | 'ru' | 'fr' | 'de' | 'es' | 'zh' | 'ja';

interface ThemeContextType {
  theme: ThemeType;
  language: LanguageType;
  setTheme: (theme: ThemeType) => void;
  setLanguage: (language: LanguageType) => void;
  getTranslation: (key: string) => string;
}

// Default context
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  language: 'en',
  setTheme: () => null,
  setLanguage: () => null,
  getTranslation: () => '',
});

// Translation dictionary
const translations: Record<string, Record<LanguageType, string>> = {
  // Languages
  english: {
    en: 'English',
    ru: 'Английский',
    fr: 'Anglais',
    de: 'Englisch',
    es: 'Inglés',
    zh: '英语',
    ja: '英語'
  },
  secureStorage: {
    en: 'Secure Storage',
    ru: 'Безопасное хранилище',
    fr: 'Stockage sécurisé',
    de: 'Sicherer Speicher',
    es: 'Almacenamiento seguro',
    zh: '安全存储',
    ja: 'セキュアストレージ'
  },
  russian: {
    en: 'Russian',
    ru: 'Русский',
    fr: 'Russe',
    de: 'Russisch',
    es: 'Ruso',
    zh: '俄语',
    ja: 'ロシア語'
  },
  french: {
    en: 'French',
    ru: 'Французский',
    fr: 'Français',
    de: 'Französisch',
    es: 'Francés',
    zh: '法语',
    ja: 'フランス語'
  },
  german: {
    en: 'German',
    ru: 'Немецкий',
    fr: 'Allemand',
    de: 'Deutsch',
    es: 'Alemán',
    zh: '德语',
    ja: 'ドイツ語'
  },
  spanish: {
    en: 'Spanish',
    ru: 'Испанский',
    fr: 'Espagnol',
    de: 'Spanisch',
    es: 'Español',
    zh: '西班牙语',
    ja: 'スペイン語'
  },
  chinese: {
    en: 'Chinese',
    ru: 'Китайский',
    fr: 'Chinois',
    de: 'Chinesisch',
    es: 'Chino',
    zh: '中文',
    ja: '中国語'
  },
  japanese: {
    en: 'Japanese',
    ru: 'Японский',
    fr: 'Japonais',
    de: 'Japanisch',
    es: 'Japonés',
    zh: '日语',
    ja: '日本語'
  },
  
  // Theme
  light: {
    en: 'Light',
    ru: 'Светлая',
    fr: 'Clair',
    de: 'Hell',
    es: 'Claro',
    zh: '明亮',
    ja: 'ライト'
  },
  dark: {
    en: 'Dark',
    ru: 'Темная',
    fr: 'Sombre',
    de: 'Dunkel',
    es: 'Oscuro',
    zh: '深色',
    ja: 'ダーク'
  },
  system: {
    en: 'System',
    ru: 'Системная',
    fr: 'Système',
    de: 'System',
    es: 'Sistema',
    zh: '系统',
    ja: 'システム'
  },
  
  // Signin page
  signInTitle: {
    en: 'Sign in to PersonalCloud',
    ru: 'Вход в PersonalCloud',
    fr: 'Connectez-vous à PersonalCloud',
    de: 'Bei PersonalCloud anmelden',
    es: 'Iniciar sesión en PersonalCloud',
    zh: '登录到 PersonalCloud',
    ja: 'PersonalCloudにサインイン'
  },
  signInSubtitle: {
    en: 'Access your personal secure storage',
    ru: 'Доступ к вашему личному безопасному хранилищу',
    fr: 'Accédez à votre stockage personnel sécurisé',
    de: 'Zugriff auf Ihren persönlichen, sicheren Speicher',
    es: 'Accede a tu almacenamiento personal seguro',
    zh: '访问您的个人安全存储',
    ja: '個人の安全なストレージにアクセス'
  },
  username: {
    en: 'Username',
    ru: 'Имя пользователя',
    fr: 'Nom d\'utilisateur',
    de: 'Benutzername',
    es: 'Nombre de usuario',
    zh: '用户名',
    ja: 'ユーザー名'
  },
  usernamePrompt: {
    en: 'Enter your username',
    ru: 'Введите имя пользователя',
    fr: 'Entrez votre nom d\'utilisateur',
    de: 'Geben Sie Ihren Benutzernamen ein',
    es: 'Ingrese su nombre de usuario',
    zh: '输入您的用户名',
    ja: 'ユーザー名を入力してください'
  },
  password: {
    en: 'Password',
    ru: 'Пароль',
    fr: 'Mot de passe',
    de: 'Passwort',
    es: 'Contraseña',
    zh: '密码',
    ja: 'パスワード'
  },
  signIn: {
    en: 'Sign In',
    ru: 'Войти',
    fr: 'Se connecter',
    de: 'Anmelden',
    es: 'Iniciar sesión',
    zh: '登录',
    ja: 'サインイン'
  },
  signingIn: {
    en: 'Signing In...',
    ru: 'Вход...',
    fr: 'Connexion...',
    de: 'Anmelden...',
    es: 'Iniciando sesión...',
    zh: '登录中...',
    ja: 'サインイン中...'
  },
  authError: {
    en: 'Authentication Error',
    ru: 'Ошибка Аутентификации',
    fr: 'Erreur d\'authentification',
    de: 'Authentifizierungsfehler',
    es: 'Error de autenticación',
    zh: '身份验证错误',
    ja: '認証エラー'
  },
  invalidCredentials: {
    en: 'Invalid credentials. Please check your username and password.',
    ru: 'Неверные учетные данные. Пожалуйста, проверьте имя пользователя и пароль.',
    fr: 'Identifiants invalides. Veuillez vérifier votre nom d\'utilisateur et votre mot de passe.',
    de: 'Ungültige Anmeldedaten. Bitte überprüfen Sie Ihren Benutzernamen und Ihr Passwort.',
    es: 'Credenciales inválidas. Por favor, verifique su nombre de usuario y contraseña.',
    zh: '无效的凭据。请检查您的用户名和密码。',
    ja: '認証情報が無効です。ユーザー名とパスワードを確認してください。'
  },
  welcome: {
    en: 'Welcome!',
    ru: 'Добро пожаловать!',
    fr: 'Bienvenue !',
    de: 'Willkommen!',
    es: '¡Bienvenido!',
    zh: '欢迎！',
    ja: 'ようこそ！'
  },
  signedInSuccess: {
    en: 'Successfully signed in.',
    ru: 'Вход выполнен успешно.',
    fr: 'Connecté avec succès.',
    de: 'Erfolgreich angemeldet.',
    es: 'Inicio de sesión exitoso.',
    zh: '登录成功。',
    ja: 'サインインに成功しました。'
  },
  error: {
    en: 'Error',
    ru: 'Ошибка',
    fr: 'Erreur',
    de: 'Fehler',
    es: 'Error',
    zh: '错误',
    ja: 'エラー'
  },
  signInError: {
    en: 'An error occurred during sign in',
    ru: 'Произошла ошибка при входе в систему',
    fr: 'Une erreur s\'est produite lors de la connexion',
    de: 'Beim Anmelden ist ein Fehler aufgetreten',
    es: 'Ocurrió un error durante el inicio de sesión',
    zh: '登录过程中发生错误',
    ja: 'サインイン中にエラーが発生しました'
  },
  
  // Navigation and Common
  settings: {
    en: 'Settings',
    ru: 'Настройки',
    fr: 'Paramètres',
    de: 'Einstellungen',
    es: 'Configuración',
    zh: '设置',
    ja: '設定'
  },
  myFiles: {
    en: 'My Files',
    ru: 'Мои файлы',
    fr: 'Mes fichiers',
    de: 'Meine Dateien',
    es: 'Mis archivos',
    zh: '我的文件',
    ja: '私のファイル'
  },
  uploadFile: {
    en: 'Upload File',
    ru: 'Загрузить файл',
    fr: 'Télécharger un fichier',
    de: 'Datei hochladen',
    es: 'Subir archivo',
    zh: '上传文件',
    ja: 'ファイルをアップロード'
  },
  newFolder: {
    en: 'New Folder',
    ru: 'Новая папка',
    fr: 'Nouveau dossier',
    de: 'Neuer Ordner',
    es: 'Nueva carpeta',
    zh: '新建文件夹',
    ja: '新しいフォルダ'
  },
  logout: {
    en: 'Log Out',
    ru: 'Выйти',
    fr: 'Déconnexion',
    de: 'Abmelden',
    es: 'Cerrar sesión',
    zh: '退出登录',
    ja: 'ログアウト'
  },
  folders: {
    en: 'Folders',
    ru: 'Папки',
    fr: 'Dossiers',
    de: 'Ordner',
    es: 'Carpetas',
    zh: '文件夹',
    ja: 'フォルダ'
  },
  files: {
    en: 'Files',
    ru: 'Файлы',
    fr: 'Fichiers',
    de: 'Dateien',
    es: 'Archivos',
    zh: '文件',
    ja: 'ファイル'
  },
  noFolders: {
    en: 'No folders found',
    ru: 'Папки не найдены',
    fr: 'Aucun dossier trouvé',
    de: 'Keine Ordner gefunden',
    es: 'No se encontraron carpetas',
    zh: '没有找到文件夹',
    ja: 'フォルダが見つかりません'
  },
  noFiles: {
    en: 'No files found',
    ru: 'Файлы не найдены',
    fr: 'Aucun fichier trouvé',
    de: 'Keine Dateien gefunden',
    es: 'No se encontraron archivos',
    zh: '没有找到文件',
    ja: 'ファイルが見つかりません'
  },
  download: {
    en: 'Download',
    ru: 'Скачать',
    fr: 'Télécharger',
    de: 'Herunterladen',
    es: 'Descargar',
    zh: '下载',
    ja: 'ダウンロード'
  },
  delete: {
    en: 'Delete',
    ru: 'Удалить',
    fr: 'Supprimer',
    de: 'Löschen',
    es: 'Eliminar',
    zh: '删除',
    ja: '削除'
  },
  share: {
    en: 'Share',
    ru: 'Поделиться',
    fr: 'Partager',
    de: 'Teilen',
    es: 'Compartir',
    zh: '分享',
    ja: '共有'
  },
  star: {
    en: 'Star',
    ru: 'Отметить',
    fr: 'Marquer',
    de: 'Markieren',
    es: 'Destacar',
    zh: '星标',
    ja: 'スター'
  },
  unstar: {
    en: 'Unstar',
    ru: 'Снять отметку',
    fr: 'Supprimer marque',
    de: 'Markierung aufheben',
    es: 'Quitar destacado',
    zh: '取消星标',
    ja: 'スターを削除'
  },
  fileDeleted: {
    en: 'File Deleted',
    ru: 'Файл удален',
    fr: 'Fichier supprimé',
    de: 'Datei gelöscht',
    es: 'Archivo eliminado',
    zh: '文件已删除',
    ja: 'ファイルが削除されました'
  },
  fileDeletedDesc: {
    en: 'The file has been successfully deleted.',
    ru: 'Файл был успешно удален.',
    fr: 'Le fichier a été supprimé avec succès.',
    de: 'Die Datei wurde erfolgreich gelöscht.',
    es: 'El archivo ha sido eliminado con éxito.',
    zh: '文件已成功删除。',
    ja: 'ファイルが正常に削除されました。'
  },
  folderDeleted: {
    en: 'Folder Deleted',
    ru: 'Папка удалена',
    fr: 'Dossier supprimé',
    de: 'Ordner gelöscht',
    es: 'Carpeta eliminada',
    zh: '文件夹已删除',
    ja: 'フォルダが削除されました'
  },
  folderDeletedDesc: {
    en: 'The folder has been successfully deleted.',
    ru: 'Папка была успешно удалена.',
    fr: 'Le dossier a été supprimé avec succès.',
    de: 'Der Ordner wurde erfolgreich gelöscht.',
    es: 'La carpeta ha sido eliminada con éxito.',
    zh: '文件夹已成功删除。',
    ja: 'フォルダが正常に削除されました。'
  },
  fileStarred: {
    en: 'File Starred',
    ru: 'Файл отмечен',
    fr: 'Fichier marqué',
    de: 'Datei markiert',
    es: 'Archivo destacado',
    zh: '已标记文件',
    ja: 'スターが付いたファイル'
  },
  fileStarredDesc: {
    en: 'The file has been added to your starred items.',
    ru: 'Файл добавлен в отмеченные элементы.',
    fr: 'Le fichier a été ajouté à vos éléments marqués.',
    de: 'Die Datei wurde zu Ihren markierten Elementen hinzugefügt.',
    es: 'El archivo ha sido añadido a tus elementos destacados.',
    zh: '文件已添加到已标记的项目中。',
    ja: 'ファイルがスターが付いたアイテムに追加されました。'
  },
  fileUnstarred: {
    en: 'File Unstarred',
    ru: 'Отметка с файла снята',
    fr: 'Marque du fichier supprimée',
    de: 'Markierung der Datei aufgehoben',
    es: 'Destacado eliminado del archivo',
    zh: '取消星标文件',
    ja: 'スターが付いたファイルを削除'
  },
  fileUnstarredDesc: {
    en: 'The file has been removed from your starred items.',
    ru: 'Файл удален из отмеченных элементов.',
    fr: 'Le fichier a été supprimé de vos éléments marqués.',
    de: 'Die Datei wurde aus Ihren markierten Elementen entfernt.',
    es: 'El archivo ha sido eliminado de tus elementos destacados.',
    zh: '文件已从已标记的项目中删除。',
    ja: 'ファイルがスターが付いたアイテムから削除されました。'
  },
  fileShared: {
    en: 'File Shared',
    ru: 'Доступ к файлу открыт',
    fr: 'Fichier partagé',
    de: 'Datei geteilt',
    es: 'Archivo compartido',
    zh: '文件已共享',
    ja: 'ファイルが共有されました'
  },
  fileSharedDesc: {
    en: 'The file sharing link has been copied to clipboard.',
    ru: 'Ссылка на файл скопирована в буфер обмена.',
    fr: 'Le lien de partage du fichier a été copié dans le presse-papiers.',
    de: 'Der Link zum Teilen der Datei wurde in die Zwischenablage kopiert.',
    es: 'El enlace para compartir el archivo ha sido copiado al portapapeles.',
    zh: '文件共享链接已复制到剪贴板。',
    ja: 'ファイルの共有リンクがクリップボードにコピーされました。'
  },
  fileUnshared: {
    en: 'File Unshared',
    ru: 'Доступ к файлу закрыт',
    fr: 'Partage du fichier supprimé',
    de: 'Dateifreigabe aufgehoben',
    es: 'Archivo no compartido',
    zh: '文件已取消共享',
    ja: 'ファイルが共有されません'
  },
  fileUnsharedDesc: {
    en: 'The file is no longer shared.',
    ru: 'Файл больше не доступен для общего доступа.',
    fr: 'Le fichier n\'est plus partagé.',
    de: 'Die Datei wird nicht mehr geteilt.',
    es: 'El archivo ya no está compartido.',
    zh: '文件不再共享。',
    ja: 'ファイルが共有されません。'
  },
  themeChanged: {
    en: 'Theme Changed',
    ru: 'Тема Изменена',
    fr: 'Thème Modifié',
    de: 'Thema Geändert',
    es: 'Tema Cambiado',
    zh: '主题已更改',
    ja: 'テーマが変更されました'
  },
  themeLightDesc: {
    en: 'Light theme applied.',
    ru: 'Светлая тема применена.',
    fr: 'Thème clair appliqué.',
    de: 'Helles Thema angewendet.',
    es: 'Tema claro aplicado.',
    zh: '已应用浅色主题。',
    ja: 'ライトテーマが適用されました。'
  },
  themeDarkDesc: {
    en: 'Dark theme applied.',
    ru: 'Темная тема применена.',
    fr: 'Thème sombre appliqué.',
    de: 'Dunkles Thema angewendet.',
    es: 'Tema oscuro aplicado.',
    zh: '已应用深色主题。',
    ja: 'ダークテーマが適用されました。'
  },
  themeSystemDesc: {
    en: 'System theme applied.',
    ru: 'Системная тема применена.',
    fr: 'Thème système appliqué.',
    de: 'Systemthema angewendet.',
    es: 'Tema del sistema aplicado.',
    zh: '已应用系统主题。',
    ja: 'システムテーマが適用されました。'
  },
  languageChanged: {
    en: 'Language Changed',
    ru: 'Язык Изменен',
    fr: 'Langue Modifiée',
    de: 'Sprache Geändert',
    es: 'Idioma Cambiado',
    zh: '语言已更改',
    ja: '言語が変更されました'
  },
  languageChangedDesc: {
    en: 'English has been set as your language.',
    ru: 'Русский язык выбран.',
    fr: 'Le français a été défini comme votre langue.',
    de: 'Deutsch wurde als Ihre Sprache festgelegt.',
    es: 'El español ha sido establecido como su idioma.',
    zh: '已将英语设置为您的语言。',
    ja: '英語があなたの言語として設定されました。'
  },
  language: {
    en: 'Language',
    ru: 'Язык',
    fr: 'Langue',
    de: 'Sprache',
    es: 'Idioma',
    zh: '语言',
    ja: '言語'
  },
  languageDesc: {
    en: 'Choose your preferred language for the interface.',
    ru: 'Выберите предпочитаемый язык интерфейса.',
    fr: 'Choisissez la langue préférée pour l\'interface.',
    de: 'Wählen Sie Ihre bevorzugte Sprache für die Benutzeroberfläche.',
    es: 'Elija su idioma preferido para la interfaz.',
    zh: '选择您喜欢的界面语言。',
    ja: 'インターフェースのお好みの言語を選択してください。'
  },
  theme: {
    en: 'Theme',
    ru: 'Тема',
    fr: 'Thème',
    de: 'Thema',
    es: 'Tema',
    zh: '主题',
    ja: 'テーマ'
  },
  themeDesc: {
    en: 'Customize the appearance of your interface.',
    ru: 'Настройте внешний вид вашего интерфейса.',
    fr: 'Personnalisez l\'apparence de votre interface.',
    de: 'Passen Sie das Erscheinungsbild Ihrer Oberfläche an.',
    es: 'Personalice la apariencia de su interfaz.',
    zh: '自定义界面外观。',
    ja: 'インターフェースの外観をカスタマイズします。'
  },
  security: {
    en: 'Security',
    ru: 'Безопасность',
    fr: 'Sécurité',
    de: 'Sicherheit',
    es: 'Seguridad',
    zh: '安全',
    ja: 'セキュリティ'
  },
  securityDesc: {
    en: 'Manage your account security settings.',
    ru: 'Управление настройками безопасности учетной записи.',
    fr: 'Gérez les paramètres de sécurité de votre compte.',
    de: 'Verwalten Sie Ihre Kontoeinstellungen zur Sicherheit.',
    es: 'Administre la configuración de seguridad de su cuenta.',
    zh: '管理您的账户安全设置。',
    ja: 'アカウントのセキュリティ設定を管理します。'
  },
  changePassword: {
    en: 'Change Password',
    ru: 'Изменить пароль',
    fr: 'Changer le mot de passe',
    de: 'Passwort ändern',
    es: 'Cambiar contraseña',
    zh: '更改密码',
    ja: 'パスワードを変更'
  },
  lastChanged: {
    en: 'Last password change: Never',
    ru: 'Последнее изменение пароля: Никогда',
    fr: 'Dernier changement de mot de passe: Jamais',
    de: 'Letzte Passwortänderung: Nie',
    es: 'Último cambio de contraseña: Nunca',
    zh: '最后一次密码更改：从未',
    ja: '最後のパスワードの変更：一度も'
  },
  // Landing page
  personalSecure: {
    en: 'Your personal',
    ru: 'Ваше личное',
    fr: 'Votre espace',
    de: 'Ihr persönlicher',
    es: 'Tu almacenamiento',
    zh: '您的个人',
    ja: 'あなたの個人的な'
  },
  cloudStorage: {
    en: 'secure storage.',
    ru: 'безопасное хранилище.',
    fr: 'personnel sécurisé.',
    de: 'sicherer Speicher.',
    es: 'personal seguro.',
    zh: '安全存储。',
    ja: '安全なストレージ。'
  },
  heroDescription: {
    en: 'Safe and convenient access to your files from any device. Your data stays private and secure on your own server.',
    ru: 'Безопасный и удобный доступ к вашим файлам с любого устройства. Ваши данные остаются приватными и защищенными на вашем собственном сервере.',
    fr: 'Accédez à vos fichiers en toute sécurité et commodité depuis n\'importe quel appareil. Vos données restent privées et sécurisées sur votre propre serveur.',
    de: 'Sicherer und bequemer Zugriff auf Ihre Dateien von jedem Gerät aus. Ihre Daten bleiben privat und sicher auf Ihrem eigenen Server.',
    es: 'Acceso seguro y conveniente a tus archivos desde cualquier dispositivo. Tus datos permanecen privados y seguros en tu propio servidor.',
    zh: '从任何设备安全便捷地访问您的文件。您的数据保持私密并安全地存储在您自己的服务器上。',
    ja: 'どのデバイスからでも安全かつ便利にファイルにアクセスできます。あなたのデータは自分のサーバー上でプライベートかつ安全に保たれます。'
  },
  accessFiles: {
    en: 'Access Files',
    ru: 'Доступ к файлам',
    fr: 'Accéder aux fichiers',
    de: 'Auf Dateien zugreifen',
    es: 'Acceder a archivos',
    zh: '访问文件',
    ja: 'ファイルにアクセス'
  },
  learnMore: {
    en: 'Learn More',
    ru: 'Узнать больше',
    fr: 'En savoir plus',
    de: 'Mehr erfahren',
    es: 'Saber más',
    zh: '了解更多',
    ja: '詳細を見る'
  },
  featuresTitle: {
    en: 'Personal Secure Storage',
    ru: 'Персональное защищенное хранилище',
    fr: 'Stockage personnel sécurisé',
    de: 'Persönlicher sicherer Speicher',
    es: 'Almacenamiento personal seguro',
    zh: '个人安全存储',
    ja: '個人用セキュアストレージ'
  },
  featuresSubtitle: {
    en: 'Your files are only accessible to you, with full privacy and control.',
    ru: 'Ваши файлы доступны только вам, с полной конфиденциальностью и контролем.',
    fr: 'Vos fichiers ne sont accessibles qu\'à vous, avec une confidentialité et un contrôle total.',
    de: 'Ihre Dateien sind nur für Sie zugänglich, mit voller Privatsphäre und Kontrolle.',
    es: 'Tus archivos solo son accesibles para ti, con total privacidad y control.',
    zh: '您的文件只有您才能访问，完全保护隐私和控制权。',
    ja: 'あなたのファイルはあなただけがアクセスでき、完全なプライバシーとコントロールを備えています。'
  },
  secureAccessTitle: {
    en: 'Secure Access',
    ru: 'Безопасный доступ',
    fr: 'Accès sécurisé',
    de: 'Sicherer Zugriff',
    es: 'Acceso seguro',
    zh: '安全访问',
    ja: '安全なアクセス'
  },
  secureAccessDesc: {
    en: 'Your personal data is protected with high-level encryption and secure authentication.',
    ru: 'Ваши личные данные защищены высокоуровневым шифрованием и безопасной аутентификацией.',
    fr: 'Vos données personnelles sont protégées par un chiffrement de haut niveau et une authentification sécurisée.',
    de: 'Ihre persönlichen Daten werden durch Verschlüsselung auf hohem Niveau und sichere Authentifizierung geschützt.',
    es: 'Tus datos personales están protegidos con cifrado de alto nivel y autenticación segura.',
    zh: '您的个人数据受到高级加密和安全认证的保护。',
    ja: 'あなたの個人データは高レベルの暗号化と安全な認証で保護されています。'
  },
  multiLanguageTitle: {
    en: 'Multi-language Support',
    ru: 'Многоязычная поддержка',
    fr: 'Support multilingue',
    de: 'Mehrsprachige Unterstützung',
    es: 'Soporte multilingüe',
    zh: '多语言支持',
    ja: '多言語サポート'
  },
  multiLanguageDesc: {
    en: 'Full support for multiple languages and interfaces for your convenience.',
    ru: 'Полная поддержка нескольких языков и интерфейсов для вашего удобства.',
    fr: 'Prise en charge complète de plusieurs langues et interfaces pour votre commodité.',
    de: 'Vollständige Unterstützung für mehrere Sprachen und Schnittstellen für Ihren Komfort.',
    es: 'Soporte completo para múltiples idiomas e interfaces para tu comodidad.',
    zh: '为您的便利提供多种语言和界面的完全支持。',
    ja: 'あなたの便宜のために複数の言語とインターフェースの完全なサポート。'
  },
  themesTitle: {
    en: 'Customizable Themes',
    ru: 'Настраиваемые темы',
    fr: 'Thèmes personnalisables',
    de: 'Anpassbare Designs',
    es: 'Temas personalizables',
    zh: '可自定义主题',
    ja: 'カスタマイズ可能なテーマ'
  },
  themesDesc: {
    en: 'Personalize your experience with light and dark mode themes and interface settings.',
    ru: 'Персонализируйте ваш опыт с помощью светлой и темной темы и настроек интерфейса.',
    fr: 'Personnalisez votre expérience avec des thèmes en mode clair et sombre et des paramètres d\'interface.',
    de: 'Personalisieren Sie Ihre Erfahrung mit hellen und dunklen Designs und Schnittstelleneinstellungen.',
    es: 'Personaliza tu experiencia con temas de modo claro y oscuro y configuraciones de interfaz.',
    zh: '通过浅色和深色模式主题以及界面设置来个性化您的体验。',
    ja: 'ライトモードとダークモードのテーマとインターフェース設定でエクスペリエンスをパーソナライズします。'
  },
  performanceTitle: {
    en: 'Lightning Fast Performance',
    ru: 'Молниеносная производительность',
    fr: 'Performances ultra-rapides',
    de: 'Blitzschnelle Leistung',
    es: 'Rendimiento ultrarrápido',
    zh: '闪电般的性能',
    ja: '超高速パフォーマンス'
  },
  performanceDesc: {
    en: 'Experience seamless file operations with our optimized cloud storage system designed for speed and reliability.',
    ru: 'Испытайте беспрепятственную работу с файлами благодаря нашей оптимизированной системе облачного хранения, разработанной для скорости и надежности.',
    fr: 'Bénéficiez d\'opérations de fichiers fluides grâce à notre système de stockage cloud optimisé, conçu pour la rapidité et la fiabilité.',
    de: 'Erleben Sie nahtlose Dateioperationen mit unserem optimierten Cloud-Speichersystem, das für Geschwindigkeit und Zuverlässigkeit entwickelt wurde.',
    es: 'Experimenta operaciones de archivos sin problemas con nuestro sistema de almacenamiento en la nube optimizado para velocidad y fiabilidad.',
    zh: '通过我们针对速度和可靠性优化的云存储系统，体验无缝的文件操作。',
    ja: '速度と信頼性のために最適化されたクラウドストレージシステムで、シームレスなファイル操作を体験してください。'
  },
  tryNow: {
    en: 'Try it Now',
    ru: 'Попробуйте сейчас',
    fr: 'Essayez maintenant',
    de: 'Jetzt ausprobieren',
    es: 'Pruébalo ahora',
    zh: '立即尝试',
    ja: '今すぐ試す'
  },
  product: {
    en: 'Product',
    ru: 'Продукт',
    fr: 'Produit',
    de: 'Produkt',
    es: 'Producto',
    zh: '产品',
    ja: '製品'
  },
  features: {
    en: 'Features',
    ru: 'Возможности',
    fr: 'Fonctionnalités',
    de: 'Funktionen',
    es: 'Características',
    zh: '功能',
    ja: '機能'
  },
  pricing: {
    en: 'Pricing',
    ru: 'Цены',
    fr: 'Tarification',
    de: 'Preise',
    es: 'Precios',
    zh: '价格',
    ja: '価格'
  },
  resources: {
    en: 'Resources',
    ru: 'Ресурсы',
    fr: 'Ressources',
    de: 'Ressourcen',
    es: 'Recursos',
    zh: '资源',
    ja: 'リソース'
  },
  documentation: {
    en: 'Documentation',
    ru: 'Документация',
    fr: 'Documentation',
    de: 'Dokumentation',
    es: 'Documentación',
    zh: '文档',
    ja: 'ドキュメント'
  },
  guides: {
    en: 'Guides',
    ru: 'Руководства',
    fr: 'Guides',
    de: 'Anleitungen',
    es: 'Guías',
    zh: '指南',
    ja: 'ガイド'
  },
  api: {
    en: 'API',
    ru: 'API',
    fr: 'API',
    de: 'API',
    es: 'API',
    zh: 'API',
    ja: 'API'
  },
  company: {
    en: 'Company',
    ru: 'Компания',
    fr: 'Entreprise',
    de: 'Unternehmen',
    es: 'Empresa',
    zh: '公司',
    ja: '会社'
  },
  about: {
    en: 'About',
    ru: 'О нас',
    fr: 'À propos',
    de: 'Über uns',
    es: 'Acerca de',
    zh: '关于我们',
    ja: '会社概要'
  },
  blog: {
    en: 'Blog',
    ru: 'Блог',
    fr: 'Blog',
    de: 'Blog',
    es: 'Blog',
    zh: '博客',
    ja: 'ブログ'
  },
  careers: {
    en: 'Careers',
    ru: 'Карьера',
    fr: 'Carrières',
    de: 'Karriere',
    es: 'Carreras',
    zh: '职业机会',
    ja: 'キャリア'
  },
  legal: {
    en: 'Legal',
    ru: 'Юридическая информация',
    fr: 'Mentions légales',
    de: 'Rechtliches',
    es: 'Legal',
    zh: '法律信息',
    ja: '法的情報'
  },
  privacy: {
    en: 'Privacy Policy',
    ru: 'Политика конфиденциальности',
    fr: 'Politique de confidentialité',
    de: 'Datenschutzrichtlinie',
    es: 'Política de privacidad',
    zh: '隐私政策',
    ja: 'プライバシーポリシー'
  },
  terms: {
    en: 'Terms of Service',
    ru: 'Условия использования',
    fr: 'Conditions d\'utilisation',
    de: 'Nutzungsbedingungen',
    es: 'Términos de servicio',
    zh: '服务条款',
    ja: '利用規約'
  },
  cookies: {
    en: 'Cookies',
    ru: 'Файлы cookie',
    fr: 'Cookies',
    de: 'Cookies',
    es: 'Cookies',
    zh: 'Cookie',
    ja: 'クッキー'
  },
  allRightsReserved: {
    en: 'All Rights Reserved',
    ru: 'Все права защищены',
    fr: 'Tous droits réservés',
    de: 'Alle Rechte vorbehalten',
    es: 'Todos los derechos reservados',
    zh: '保留所有权利',
    ja: '全著作権所有'
  },
  newFeatures: {
    en: 'New Features',
    ru: 'Новые функции',
    fr: 'Nouvelles fonctionnalités',
    de: 'Neue Funktionen',
    es: 'Nuevas características',
    zh: '新功能',
    ja: '新機能'
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('system');
  const [language, setLanguageState] = useState<LanguageType>('en');
  const { toast } = useToast();

  const getTranslation = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    const translation = translations[key][language];
    if (!translation) {
      console.warn(`Translation not found for key "${key}" in language "${language}"`);
      return translations[key]['en'] || key; // Fallback to English or key itself
    }

    return translation;
  };

  const setTheme = (newTheme: ThemeType) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(newTheme);
    }
    
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    
    toast({
      title: getTranslation('themeChanged'),
      description: getTranslation(`theme${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)}Desc`),
    });
  };

  const setLanguage = (newLanguage: LanguageType) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    const savedLanguage = localStorage.getItem('language') as LanguageType | null;
    
    // Initialize language from browser or local storage
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLanguage = navigator.language.split('-')[0] as LanguageType;
      const supportedLanguages = ['en', 'ru', 'fr', 'de', 'es', 'zh', 'ja'];
      
      if (supportedLanguages.includes(browserLanguage)) {
        setLanguageState(browserLanguage as LanguageType);
        localStorage.setItem('language', browserLanguage);
      }
    }

    if (savedTheme) {
      setThemeState(savedTheme);
      
      if (savedTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        document.documentElement.classList.add(systemTheme);
      } else {
        document.documentElement.classList.add(savedTheme);
      }
    } else {
      // Default to system theme
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      document.documentElement.classList.add(systemTheme);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        if (e.matches) {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
      }
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, language, setTheme, setLanguage, getTranslation }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 