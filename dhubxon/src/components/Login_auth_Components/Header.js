import {Link} from 'react-router-dom';
import logo from "../../assets/logo.png"
export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-28 w-44"
                    src={logo}/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className=" text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-blue-500 hover:text-blue-700">
                {linkName}
            </Link>
            </p>
        </div>
    )




}