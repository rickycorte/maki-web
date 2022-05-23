import Container from "../components/container";
import Footer from "../components/footer";
import GradientTitle from "../components/grandietTitle";

export default function CreditsPage (){
    return (
        <Container>
            <GradientTitle>
                <a href="/" style={{width: "100%", textAlign: "center"}}>
                    <h3 style={{width: "100%", textAlign: "center"}}>Maki</h3>
                </a>
            </GradientTitle>
            <div className="container link">
                <div className="container_body">
                    <h1>Credits</h1>
                    <h3>Images</h3>
                    <ul>
                        <li><a href="#">EVE by minttydrops</a></li>
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </Container>
        )
}