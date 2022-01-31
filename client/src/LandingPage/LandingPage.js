import styled from "styled-components";
import TextComponent from "./text";
import WeatherInfo from "./WeatherInfo";
import logo from "../assets/img/logo_titleO.png";

const Body = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    width: 30%;
    height: 30%;
    border: 0.5px solid grey;
    padding: 5px;
    margin: 50px;
    box-shadow: 5px 5px 5px grey;
  }
`;

const LandingPage = () => {
  return (
    <div>
      <Body>
        <img src={logo} alt={"로고 이미지"} />
        <TextComponent />
      </Body>
      <WeatherInfo />
    </div>
  );
};
export default LandingPage;