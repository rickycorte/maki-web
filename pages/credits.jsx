import Link from "next/link";
import Container from "../components/container";
import Footer from "../components/footer";
import GradientTitle from "../components/grandietTitle";
import Head from 'next/head';

export default function CreditsPage (){
    return (
        <Container>
           <Head>
                <title>Credits | Maki</title>
                <meta
                    name="description"
                    content="Credits for images used on the web application"
                />
            </Head>
            <GradientTitle>
                <Link href="/">
                    <a style={{width: "100%", textAlign: "center"}}>
                        <h3 style={{width: "100%", textAlign: "center"}}>Maki</h3>
                    </a>
                </Link>
            </GradientTitle>
            <div className="container link">
                <div className="container_body">
                    <h1>Credits</h1>
                    <p>Disclaimer: I do now own any right on the images and videos on the landing page of this site.</p>
                    <h3>Images</h3>
                    <ul>
                        <li><Link href="https://www.flaticon.com/free-icons/maki">Maki icons created by Freepik - Flaticon</Link></li>
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </Container>
        )
}