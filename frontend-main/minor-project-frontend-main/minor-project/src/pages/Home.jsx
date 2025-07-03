
import FlightSearchComponent from "../components/flight-search-component";
import Header from "../components/header";

function Home() {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            margin: 0,
            padding: 0,
            overflow: "hidden"
        }}>
            <Header/>
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -1
                }}
            >
                <source src="/background-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Content */}
            <div style={{
                position: "relative",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                color: "white",
                textAlign: "center",
                paddingTop: "50px",
                boxSizing: "border-box",
                overflow: "auto"
            }}>
                <h1>Welcome to The Trip Finder</h1>
                <p>They say that the world has seven wonders. We think that's only the beginning.</p>
                <div style={{ margin: "20px 0" }}>
                    <hr style={{ margin: "5px 0" }}></hr>
                    <hr style={{ margin: "5px 0" }}></hr>
                    <hr style={{ margin: "5px 0" }}></hr>
                </div>
                <FlightSearchComponent />
            </div>
        </div>
    );
}

export default Home;
