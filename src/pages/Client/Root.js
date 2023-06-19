import { Outlet } from 'react-router-dom';
import MainNavigation from '../../components/Navigation/MainNavigation';

function RootLayout() {
    return (
        <>
            <MainNavigation />

            <main>
                <Outlet />
            </main>

            <footer>
                <h2>Huy Watch Store</h2>
                <nav className="fot-btn">
                    <ul>
                        <li>
                            <a href="">
                                <img src="./images/icons8-facebook-96.png" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="./images/icons8-youtube-96.png" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="./images/icons8-instagram-96.png" alt="" />
                            </a>
                        </li>
                    </ul>
                </nav>
                <a href="">
                    Back to top <i className="fa-solid fa-arrow-up"></i>
                </a>
            </footer>
        </>
    );
}

export default RootLayout;
