import arrow from '../../../images/link-arrow.svg';
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__links">
                <li className="portfolio__links-li">
                    <a
                        className="portfolio__link button"
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/Cinium/rubli"
                    >
                        Проект Rubli 🔥
                        <img
                            className="portfolio-arrow-icon"
                            alt="иконка ссылки"
                            src={arrow}
                        />
                    </a>
                </li>
                <li className="portfolio__links-li">
                    <a
                        className="portfolio__link button"
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/Cinium/react-mesto-api-full"
                    >
                        Учебный проект Mesto
                        <img
                            className="portfolio-arrow-icon"
                            alt="иконка ссылки"
                            src={arrow}
                        />
                    </a>
                </li>
                <li className="portfolio__links-li">
                    <a
                        className="portfolio__link button"
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/Cinium/russian-travel"
                    >
                        Простенький сайт-брошюра с адаптивной версткой
                        <img
                            className="portfolio-arrow-icon"
                            alt="иконка ссылки"
                            src={arrow}
                        />
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;
