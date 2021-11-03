import './AboutMe.css';

function AboutMe() {
    return (
        <div className="about-me" id="about-student">
            <h2 className="about-me__title main__title">Студент</h2>
            <div className="about-me__photo" alt="фото студента" />
            <h3 className="about-me__name">Вячеслав</h3>
            <p className="about-me__job-age">
                Фронтенд-разработчик, 22 года
            </p>
            <p className="about-me__main-text">
                Я родился и живу в Екатеринбурге. Высшего образования нет,
                но я слышал, что нынче можно и без него. Достаточно хорошо
                владею чешским и английским языками, да и по-русски неплохо
                говорю. С начала 2021 года увлекся веб-разработкой и пошел
                учиться на Яндекс.Практикум. Результат сего обучения вы
                видите сейчас)
            </p>
            <ul className="about-me__links-list">
                <li className="about-me__links-li"></li>
                <li className="about-me__links-li">
                    <a
                        className="about-me__link button"
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/Cinium/"
                    >
                        Github
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default AboutMe;
