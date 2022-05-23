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
                    <h1>Privacy</h1>
                    <ol>
                        <li>Maki may temporary store you IP Adress only for rate limit purposes.</li>
                        <li>Maki stores the usernames you provide to us by using the API. Usernames are used to fetch the public anime lists associated to them.</li>
                        <li>Maki stores public anime lists (anime id, watch status, rating) fetched during the API usage for performance reasons and to further use to improve our recommender engine.</li>
                        <li>Maki will never try to indetify you in any way. Anyone can ask recommendation for any valid Anilist/MyAnimeList account that has a public list.</li>
                        <li>Maki will never try to merge or identify accounts with the same username on different anime tracking sites.</li>
                    </ol>
                </div>
            </div>
            <Footer></Footer>
        </Container>
        )
}