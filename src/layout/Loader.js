import { useSelector } from "react-redux";

const Loader = () => {
    const {isLoading} = useSelector(state=>state.loader)
    console.log(isLoading)
    return ( 
        <div>
            {isLoading ? <div className="loader">Loading...</div> : null}
        </div>
     );
}
 
export default Loader;