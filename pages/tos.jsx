import Link from "next/link";
import Container from "../components/container";
import Footer from "../components/footer";
import GradientTitle from "../components/grandietTitle";
import Head from 'next/head';

export default function ToSPage (){
    return (
        <Container>
            <Head>
                <title>Term of Service | Maki</title>
                <meta
                    name="description"
                    content="Term of service accepted by using Maki and/or Maki API"
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
                    <h1>Terms of Service</h1>
                    <ol>
                        <li>Free for commercial and non-commercial use.</li>
                        <li>You must not try to bypass in any way our rate limit.</li>
                        <li>You must not try to exploit Maki API.</li>
                        <li>You must use &quot;Maki&quot; in the title/name of any of you products that uses Maki API.</li>
                        <li>You are prohibited from use within competing noncomplementary services of the same nature, including but not limited to recommender systems.</li>
                        <li>By using Maki and/or Maki API you agree to this terms and to our privacy policy.</li>
                    </ol>
                </div>
            </div>
            <Footer></Footer>
        </Container>
        )
}