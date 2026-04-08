import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { RowDataPacket } from 'mysql2';

// 1. Настройка окружения
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// 2. ТВОИ ДАННЫЕ
// Скопируй сюда объект translations из LanguageContext.tsx
// Структура должна быть: { en: { "key": "val" }, ru: { ... } }
const translations: Record<string, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.styles': 'Styles',
    'nav.schedule': 'Schedule',
    'nav.teachers': 'Teachers',
    'nav.blog': 'Blog',
    'nav.contacts': 'Contacts',
    
    // Common
    'common.book': 'Book Your Spot',
    'common.learnMore': 'Learn More',
    'common.readMore': 'Read More',
    'common.viewSchedule': 'View Schedule',
    'common.getStarted': 'Get Started',
    'common.allStyles': 'All Styles',
    
    // HomePage
    'home.hero.title': 'Move to the Rhythm',
    'home.hero.subtitle': 'Join Eilat Dance Center',
    'home.hero.description': 'Experience the joy of dance with world-class instructors in the heart of Eilat. From beginners to professionals, we have a class for everyone.',
    'home.schedule.badge': 'This Week',
    'home.schedule.title': 'Upcoming Classes',
    'home.schedule.subtitle': 'Join us for exciting dance sessions this week',
    'home.cta.badge': 'Join Us',
    'home.cta.title': 'Ready to Start Dancing?',
    'home.cta.description': 'Book your first class today and discover the dancer within you',
    
    // Dance Styles
    'styles.badge': 'Dance Styles',
    'styles.title': 'Find Your Style',
    'styles.subtitle': 'Explore our diverse range of dance classes for all levels',
    'styles.filter.all': 'All Styles',
    'styles.filter.beginner': 'Beginner',
    'styles.filter.intermediate': 'Intermediate',
    'styles.filter.advanced': 'Advanced',
    'styles.beginner': 'Beginner',
    'styles.intermediate': 'Intermediate',
    'styles.advanced': 'Advanced',
    
    // Schedule
    'schedule.badge': 'Weekly Schedule',
    'schedule.title': 'Class Schedule',
    'schedule.subtitle': 'Plan your week with our comprehensive class schedule',
    'schedule.day.monday': 'Monday',
    'schedule.day.tuesday': 'Tuesday',
    'schedule.day.wednesday': 'Wednesday',
    'schedule.day.thursday': 'Thursday',
    'schedule.day.friday': 'Friday',
    'schedule.day.saturday': 'Saturday',
    'schedule.day.sunday': 'Sunday',
    'schedule.with': 'with',
    
    // Teachers
    'teachers.badge': 'Our Team',
    'teachers.title': 'Meet Your Instructors',
    'teachers.subtitle': 'Learn from passionate professionals dedicated to your growth',
    'teachers.experience': 'Experience',
    'teachers.specialties': 'Specialties',
    'teachers.achievements': 'Achievements',
    
    // Contacts
    'contacts.badge': 'Get In Touch',
    'contacts.title': 'Visit Us',
    'contacts.subtitle': 'Come dance with us in the beautiful city of Eilat',
    'contacts.info.title': 'Contact Information',
    'contacts.hours.title': 'Opening Hours',
    'contacts.hours.weekdays': 'Monday - Friday',
    'contacts.hours.weekend': 'Saturday - Sunday',
    'contacts.social.title': 'Follow Us',
    'contacts.map.title': 'Our Location',
    'contacts.payment.badge': 'Payment',
    'contacts.payment.title': 'Easy & Secure Payment',
    'contacts.payment.subtitle': 'We accept payments via Bit - Quick, secure, and convenient',
    'contacts.payment.scan': 'Scan to Pay',
    
    // Blog
    'blog.badge': 'Our Blog',
    'blog.title': 'Dance Stories & Tips',
    'blog.subtitle': 'Explore articles, tutorials, and inspiration from the dance world',
    'blog.readTime': 'min read',
    
    // About
    'about.badge': 'Our Story',
    'about.title': 'Welcome to Eilat Dance Center',
    'about.description1': 'Founded in 2015, Eilat Dance Center has become the premier destination for dance education in southern Israel. Our studio was born from a passion for movement and a vision to create a welcoming space where dancers of all levels could grow, express themselves, and connect with others.',
    'about.description2': 'We believe dance is more than just steps – it\'s a language that transcends barriers, builds confidence, and brings joy. Our diverse community of students ranges from young children taking their first dance steps to adults discovering new passions.',
    'about.values.title': 'Our Values',
    'about.values.passion.title': 'Passion',
    'about.values.passion.description': 'We bring energy and enthusiasm to every class, inspiring students to fall in love with dance.',
    'about.values.community.title': 'Community',
    'about.values.community.description': 'Our studio is a welcoming space where dancers support and celebrate each other\'s growth.',
    'about.values.excellence.title': 'Excellence',
    'about.values.excellence.description': 'With 15+ years of combined experience, our instructors bring world-class training and genuine care to every class.',
    'about.location.title': 'Dance in Paradise',
    'about.location.description': 'Located in beautiful Eilat, our studio offers more than just great classes – it\'s part of the vibrant cultural scene of Israel\'s southernmost city.',
    'about.cta.title': 'Join Our Dance Family',
    'about.cta.description': 'Visit us for a trial class and experience the Eilat Dance Center difference',
  },
  he: {
    // Header
    'nav.home': 'בית',
    'nav.about': 'אודות',
    'nav.styles': 'סגנונות',
    'nav.schedule': 'לוח זמנים',
    'nav.teachers': 'מורים',
    'nav.blog': 'בלוג',
    'nav.contacts': 'יצירת קשר',
    
    // Common
    'common.book': 'הזמינו מקום',
    'common.learnMore': 'למידע נוסף',
    'common.readMore': 'קרא עוד',
    'common.viewSchedule': 'צפה בלוח זמנים',
    'common.getStarted': 'התחילו עכשיו',
    'common.allStyles': 'כל הסגנונות',
    
    // HomePage
    'home.hero.title': 'תנועה בקצב',
    'home.hero.subtitle': 'הצטרפו למרכז המחול אילת',
    'home.hero.description': 'חוו את שמחת הריקוד עם מדריכים ברמה עולמית בלב אילת. למתחילים ומקצוענים, יש לנו שיעור לכולם.',
    'home.schedule.badge': 'השבוע',
    'home.schedule.title': 'שיעורים קרובים',
    'home.schedule.subtitle': 'הצטרפו אלינו לשיעורי ריקוד מרגשים השבוע',
    'home.cta.badge': 'הצטרפו אלינו',
    'home.cta.title': 'מוכנים להתחיל לרקוד?',
    'home.cta.description': 'הזמינו את השיעור הראשון שלכם היום וגלו את הרקדן שבתוככם',
    
    // Dance Styles
    'styles.badge': 'סגנונות ריקוד',
    'styles.title': 'מצאו את הסגנון שלכם',
    'styles.subtitle': 'חקרו את מגוון שיעורי הריקוד שלנו לכל הרמות',
    'styles.filter.all': 'כל הסגנונות',
    'styles.filter.beginner': 'מתחילים',
    'styles.filter.intermediate': 'בינוני',
    'styles.filter.advanced': 'מתקדמים',
    'styles.beginner': 'מתחילים',
    'styles.intermediate': 'בינוני',
    'styles.advanced': 'מתקדמים',
    
    // Schedule
    'schedule.badge': 'לוח זמנים שבועי',
    'schedule.title': 'לוח שיעורים',
    'schedule.subtitle': 'תכננו את השבוע שלכם עם לוח השיעורים המקיף שלנו',
    'schedule.day.monday': 'שני',
    'schedule.day.tuesday': 'שלישי',
    'schedule.day.wednesday': 'רביעי',
    'schedule.day.thursday': 'חמישי',
    'schedule.day.friday': 'שישי',
    'schedule.day.saturday': 'שבת',
    'schedule.day.sunday': 'ראשון',
    'schedule.with': 'עם',
    
    // Teachers
    'teachers.badge': 'הצוות שלנו',
    'teachers.title': 'הכירו את המדריכים',
    'teachers.subtitle': 'למדו ממקצוענים נלהבים המוקדשים לצמיחתכם',
    'teachers.experience': 'ניסיון',
    'teachers.specialties': 'התמחויות',
    'teachers.achievements': 'הישגים',
    
    // Contacts
    'contacts.badge': 'צרו קשר',
    'contacts.title': 'בואו לבקר אותנו',
    'contacts.subtitle': 'בואו לרקוד איתנו בעיר היפה אילת',
    'contacts.info.title': 'פרטי התקשרות',
    'contacts.hours.title': 'שעות פעילות',
    'contacts.hours.weekdays': 'ראשון - חמישי',
    'contacts.hours.weekend': 'שישי - שבת',
    'contacts.social.title': 'עקבו אחרינו',
    'contacts.map.title': 'המיקום שלנו',
    'contacts.payment.badge': 'תשלום',
    'contacts.payment.title': 'תשלום קל ומאובטח',
    'contacts.payment.subtitle': 'אנו מקבלים תשלומים דרך Bit - מהיר, מאובטח ונוח',
    'contacts.payment.scan': 'סרוק לתשלום',
    
    // Blog
    'blog.badge': 'הבלוג שלנו',
    'blog.title': 'סיפורי ריקוד וטיפים',
    'blog.subtitle': 'חקרו מאמרים, מדריכים והשראה מעולם הריקוד',
    'blog.readTime': 'דקות קריאה',
    
    // About
    'about.badge': 'הסיפור שלנו',
    'about.title': 'ברוכים הבאים למרכז המחול אילת',
    'about.description1': 'נוסד בשנת 2015, מרכז המחול אילת הפך ליעד המוביל לחינוך למחול בדרום ישראל. הסטודיו שלנו נולד מתוך תשוקה לתנועה וחזון ליצור מרחב מזמין שבו רקדנים בכל הרמות יכולים לצמוח, לבטא את עצמם ולהתחבר לאחרים.',
    'about.description2': 'אנו מאמינים שריקוד הוא יותר מסתם צעדים - זו שפה שמתעלה מעל מחסומים, בונה ביטחון ומביאה שמחה. הקהילה המגוונת שלנו של תלמידים נעה מילדים צעירים העושים את צעדי הריקוד הראשונים שלהם ועד למבוגרים שמגלים תשוקות חדשות.',
    'about.values.title': 'הערכים שלנו',
    'about.values.passion.title': 'תשוקה',
    'about.values.passion.description': 'אנו מביאים אנרגיה והתלהבות לכל שיעור, מעוררים השראה בתלמידים להתאהב בריקוד.',
    'about.values.community.title': 'קהילה',
    'about.values.community.description': 'הסטודיו שלנו הוא מרחב מזמין שבו רקדנים תומכים וחוגגים את הצמיחה של זה את זה.',
    'about.values.excellence.title': 'מצוינות',
    'about.values.excellence.description': 'עם למעלה מ-15 שנות ניסיון משולב, המדריכים שלנו מביאים הכשרה ברמה עולמית ודאגה אמיתית לכל שיעור.',
    'about.location.title': 'ריקוד בגן עדן',
    'about.location.description': 'ממוקם באילת היפה, הסטודיו שלנו מציע יותר משיעורים מצוינים - הוא חלק מהסצנה התרבותית התוססת של העיר הדרומית ביותר בישראל.',
    'about.cta.title': 'הצטרפו למשפחת הריקוד שלנו',
    'about.cta.description': 'בקרו אותנו לשיעור ניסיון וחוו את ההבדל של מרכז המחול אילת',
  },
  ru: {
    // Header
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.styles': 'Стили',
    'nav.schedule': 'Расписание',
    'nav.teachers': 'Преподаватели',
    'nav.blog': 'Блог',
    'nav.contacts': 'Контакты',
    
    // Common
    'common.book': 'Забронировать',
    'common.learnMore': 'Узнать больше',
    'common.readMore': 'Читать далее',
    'common.viewSchedule': 'Посмотреть расписание',
    'common.getStarted': 'Начать',
    'common.allStyles': 'Все стили',
    
    // HomePage
    'home.hero.title': 'Двигайся в ритме',
    'home.hero.subtitle': 'Присоединяйтесь к танцевальному центру Эйлат',
    'home.hero.description': 'Испытайте радость танца с инструкторами мирового класса в самом сердце Эйлата. От новичков до профессионалов, у нас есть класс для каждого.',
    'home.schedule.badge': 'На этой неделе',
    'home.schedule.title': 'Предстоящие занятия',
    'home.schedule.subtitle': 'Присоединяйтесь к нам на захватывающие танцевальные занятия на этой неделе',
    'home.cta.badge': 'Присоединяйтесь',
    'home.cta.title': 'Готовы начать танцевать?',
    'home.cta.description': 'Забронируйте свой первый урок сегодня и откройте в себе танцора',
    
    // Dance Styles
    'styles.badge': 'Стили танца',
    'styles.title': 'Найдите свой стиль',
    'styles.subtitle': 'Исследуйте наше разнообразие танцевальных классов для всех уровней',
    'styles.filter.all': 'Все стили',
    'styles.filter.beginner': 'Начинающие',
    'styles.filter.intermediate': 'Средний уровень',
    'styles.filter.advanced': 'Продвинутые',
    'styles.beginner': 'Начинающие',
    'styles.intermediate': 'Средний',
    'styles.advanced': 'Продвинутый',
    
    // Schedule
    'schedule.badge': 'Недельное расписание',
    'schedule.title': 'Расписание занятий',
    'schedule.subtitle': 'Планируйте свою неделю с нашим подробным расписанием занятий',
    'schedule.day.monday': 'Понедельник',
    'schedule.day.tuesday': 'Вторник',
    'schedule.day.wednesday': 'Среда',
    'schedule.day.thursday': 'Четверг',
    'schedule.day.friday': 'Пятница',
    'schedule.day.saturday': 'Суббота',
    'schedule.day.sunday': 'Воскресенье',
    'schedule.with': 'с',
    
    // Teachers
    'teachers.badge': 'Наша команда',
    'teachers.title': 'Познакомьтесь с преподавателями',
    'teachers.subtitle': 'Учитесь у увлеченных профессионалов, посвятивших себя вашему росту',
    'teachers.experience': 'Опыт',
    'teachers.specialties': 'Специализации',
    'teachers.achievements': 'Достижения',
    
    // Contacts
    'contacts.badge': 'Свяжитесь с нами',
    'contacts.title': 'Посетите нас',
    'contacts.subtitle': 'Приходите танцевать с нами в прекрасном городе Эйлат',
    'contacts.info.title': 'Контактная информация',
    'contacts.hours.title': 'Часы работы',
    'contacts.hours.weekdays': 'Понедельник - Пятница',
    'contacts.hours.weekend': 'Суббота - Воскресенье',
    'contacts.social.title': 'Следите за нами',
    'contacts.map.title': 'Наше местоположение',
    'contacts.payment.badge': 'Оплата',
    'contacts.payment.title': 'Простая и безопасная оплата',
    'contacts.payment.subtitle': 'Мы принимаем платежи через Bit - быстро, безопасно и удобно',
    'contacts.payment.scan': 'Сканировать для оплаты',
    
    // Blog
    'blog.badge': 'Наш блог',
    'blog.title': 'Танцевальные истории и советы',
    'blog.subtitle': 'Изучайте статьи, уроки и вдохновение из мира танца',
    'blog.readTime': 'мин чтения',
    
    // About
    'about.badge': 'Наша история',
    'about.title': 'Добро пожаловать в танцевальный центр Эйлат',
    'about.description1': 'Основанный в 2015 году, танцевальный центр Эйлат стал главным центром танцевального образования на юге Израиля. Наша студия родилась из страсти к движению и видения создать гостеприимное пространство, где танцоры всех уровней могли бы расти, выражать себя и общаться с другими.',
    'about.description2': 'Мы верим, что танец - это больше, чем просто шаги - это язык, который преодолевает барьеры, укрепляет уверенность и приносит радость. Наше разнообразное сообщество студентов варьируется от маленьких детей, делающих свои первые танцевальные шаги, до взрослых, открывающих новые увлечения.',
    'about.values.title': 'Наши ценности',
    'about.values.passion.title': 'Страсть',
    'about.values.passion.description': 'Мы привносим энергию и энтузиазм в каждый класс, вдохновляя студентов влюбиться в танец.',
    'about.values.community.title': 'Сообщество',
    'about.values.community.description': 'Наша студия - это гостеприимное пространство, где танцоры поддерживают и празднуют рост друг друга.',
    'about.values.excellence.title': 'Превосходство',
    'about.values.excellence.description': 'Имея более 15 лет совместного опыта, наши преподаватели привносят обучение мирового класса и искреннюю заботу в каждый класс.',
    'about.location.title': 'Танец в раю',
    'about.location.description': 'Расположенная в прекрасном Эйлате, наша студия предлагает больше, чем просто отличные занятия - она часть яркой культурной сцены самого южного города Израиля.',
    'about.cta.title': 'Присоединяйтесь к нашей танцевальной семье',
    'about.cta.description': 'Посетите нас на пробное занятие и испытайте разницу танцевального центра Эйлат',
  },
};

async function run() {

  console.log('This is one-time execution script. Not required anymore.');
  return;

  console.log('Connecting to DB...');
  
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
  });

  try {
    // 3. Получаем список всех существующих фраз (id, ident)
    // Сканер уже должен был их создать. Если фразы нет в БД, мы не сможем добавить перевод (нет ID).
    console.log('Fetching existing phrases...');
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT id, ident FROM translations');
    
    const phraseMap = new Map<string, number>();
    rows.forEach(row => phraseMap.set(row.ident, row.id));

    console.log(`Found ${phraseMap.size} phrases in DB.`);

    // 4. Проходимся по объекту переводов
    let insertedCount = 0;
    let skippedCount = 0;

    for (const lang of Object.keys(translations)) {
      const phrases = translations[lang];
      console.log(`Processing language: ${lang}...`);

      for (const [ident, text] of Object.entries(phrases)) {
        const phraseId = phraseMap.get(ident);

        if (phraseId) {
          // Записываем перевод
          // Используем ON DUPLICATE KEY UPDATE, чтобы скрипт можно было запускать повторно
          await pool.execute(
            `INSERT INTO translation_texts (phrase_id, lang, phrase_text) 
             VALUES (?, ?, ?) 
             ON DUPLICATE KEY UPDATE phrase_text = ?`,
            [phraseId, lang, text, text]
          );
          insertedCount++;
        } else {
          // Если сканер не нашел этот ident в коде (например, старый ключ), пропускаем
          // console.warn(`Warning: Ident "${ident}" not found in DB (scanner missed it?). Skipping.`);
          skippedCount++;
        }
      }
    }

    console.log('--------------------------------');
    console.log('Migration Complete!');
    console.log(`Translations processed: ${insertedCount}`);
    console.log(`Skipped (not found in DB): ${skippedCount}`);
    console.log('--------------------------------');

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

run();