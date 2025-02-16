import { createContext, useContext, useEffect, useState } from "react"

import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration"
export const AppContext=createContext()


export const AppContextProvider=(props)=>{

    const currency=import.meta.env.VITE_CURRENCY;
    const navigate=useNavigate();
    const [allCourses,setAllCourses]=useState([])
    const [isEducator,setIsEducator]=useState(true)
    

    const fetchAllCourses=async()=>{
        setAllCourses(dummyCourses);
    }
    useEffect(()=>{
        fetchAllCourses()
     },[]
    )


    const calculateRating=(course)=>{
        if(course.courseRatings.length===0){
            return 0;
        }
        let totalRating=0;
        course.courseRatings.forEach(rating=>totalRating+=rating.rating)
        return totalRating/course.courseRatings.length;
        
    }

    const calculateChapterTime = (chapter) => {
        let time = 0;
    
        if (Array.isArray(chapter.chapterContent)) {
            chapter.chapterContent.forEach((lecture) => {
                if (lecture?.lectureDuration) {
                    time += lecture.lectureDuration;
                }
            });
        }
    
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };
    
    const calculateCourseTime = (course) => {
        let time = 0;
    
        if (Array.isArray(course.courseContent)) {
            course.courseContent.forEach((chapter) => {
                if (Array.isArray(chapter.chapterContent)) {
                    chapter.chapterContent.forEach((lecture) => {
                        if (lecture?.lectureDuration) {
                            time += lecture.lectureDuration;
                        }
                    });
                }
            });
        }
    
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };
    

    const calculateNoOfLectures=(course)=>{
        let count=0;
        course.courseContent.map((chapter)=>{
            if(Array.isArray(chapter.chapterContent))
            count+=chapter.chapterContent.length
        });
        return count;
    }




    const value={
        currency,allCourses,navigate,calculateRating,isEducator,setIsEducator,calculateChapterTime,calculateCourseTime,calculateNoOfLectures
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}