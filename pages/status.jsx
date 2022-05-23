import Container from "../components/container";
import Footer from "../components/footer";
import GradientTitle from "../components/grandietTitle";

export default function ToSPage (){
    return (
        <Container>
            <GradientTitle>
                <a href="/" style={{width: "100%", textAlign: "center"}}>
                    <h3 style={{width: "100%", textAlign: "center"}}>Maki</h3>
                </a>
            </GradientTitle>
            <div className="container link">
                <div className="container_body">
                    <h1>Status</h1>
                    <iframe style={{width: "100%", height: "100vh", borderRadius: "var(--item-radius)"}} src="https://statuspage.freshping.io/56354-Maki">  
                    </iframe>
                </div>
            </div>
            <Footer></Footer>
        </Container>
        )
}