import HeaderBottom from "./HeaderBottom";
import HeaderMain from "./HeaderMain";
import HeaderTopBar from "./HeaderTopBar";


export default function Header(){
    return(
        <header>
            <HeaderTopBar/>
            <HeaderMain/>
            <HeaderBottom/>
        </header>
    )
}