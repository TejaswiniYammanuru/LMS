import React, { useEffect, useState, useRef } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { assets } from "../../../assets/assets";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId 
            ? { ...chapter, collapsed: !chapter.collapsed } 
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            const newContent = [...chapter.chapterContent];
            newContent.splice(lectureIndex, 1);
            return { ...chapter, chapterContent: newContent };
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 
              ? chapter.chapterContent[chapter.chapterContent.length - 1].lectureOrder + 1 
              : 1,
            lectureId: uniqid()
          };
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture]
          };
        }
        return chapter;
      })
    );

    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start p-6 bg-white">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Title */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Course Title</label>
            <input
              onChange={(e) => setCourseTitle(e.target.value)}
              value={courseTitle}
              type="text"
              placeholder="Enter course title"
              className="outline-none py-2 px-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Course Description */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Course Description</label>
            <div
              ref={editorRef}
              className="border border-gray-300 rounded min-h-[150px] p-2"
            ></div>
          </div>

          <div className="flex items-center justify-between flex-wrap">
            <div className="flex flex-col gap-1">
              <p>Course Price</p>
              <input
                onChange={(e) => setCoursePrice(e.target.value)}
                value={coursePrice}
                type="number"
                placeholder="0"
                className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-300"
                required
              />
            </div>

            <div className="flex md:flex-row flex-col items-center gap-3">
              <p>Course Thumbnail</p>
              <label htmlFor="thumbnailImage" className="flex items-center gap-3">
                <img
                  src={assets.file_upload_icon}
                  alt=""
                  className="p-3 bg-blue-500 rounded"
                />
                <input
                  id="thumbnailImage"
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
                {image && (
                  <img
                    className="max-h-10"
                    src={URL.createObjectURL(image)}
                    alt=""
                  />
                )}
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Discount %</p>
            <input
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              type="number"
              placeholder="0"
              min={0}
              max={100}
              className="outline-none md:py-2.5 w-28 px-3 rounded border border-gray-300"
              required
            />
          </div>

          {/* Chapters and Lectures */}
          <div>
            {chapters.map((chapter, chapterIndex) => (
              <div key={chapter.chapterId} className="bg-white border
               rounded-lg mb-4">
                <div className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center">
                    <img
                      src={assets.dropdown_icon}
                      width={14}
                      alt=""
                      onClick={() => handleChapter("toggle", chapter.chapterId)}
                      className={`mr-2 cursor-pointer transition-all ${
                        chapter.collapsed ? "-rotate-90" : ""
                      }`}
                    />
                    <span className="font-semibold">
                      {chapterIndex + 1}. {chapter.chapterTitle}
                    </span>
                  </div>

                  <span>{chapter.chapterContent.length} Lectures</span>

                  <img
                    src={assets.cross_icon}
                    alt=""
                    onClick={() => handleChapter("remove", chapter.chapterId)}
                    className="cursor-pointer"
                  />
                </div>

                {!chapter.collapsed && (
                  <div className="p-4">
                    {chapter.chapterContent.map((lecture, lectureIndex) => (
                      <div
                        key={lecture.lectureId}
                        className="flex justify-between items-center mb-2"
                      >
                        <span>
                          {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration}mins
                          - <a href={lecture.lectureUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                            Link
                          </a>
                          - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                        </span>
                        <img
                          src={assets.cross_icon}
                          alt=""
                          onClick={() => handleLecture("remove", chapter.chapterId, lectureIndex)}
                          className="cursor-pointer"
                        />
                      </div>
                    ))}
                    <div
                      className="inline-flex bg-gray-200 p-2 rounded cursor-pointer mt-2"
                      onClick={() => handleLecture("add", chapter.chapterId)}
                    >
                      + Add Lecture
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div
              className="flex justify-center items-center bg-blue-400 p-2 rounded-lg cursor-pointer"
              onClick={() => handleChapter("add")}
            >
              + Add Chapter
            </div>
          </div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center 
            
            bg-opacity-50">
              <div className="bg-white text-gray-700 p-4 rounded relative w-full border border-gray-200 max-w-md">
                <h2 className="text-lg pl-38 font-semibold mb-4">Add Lecture</h2>

                <div className="mb-4">
                  <p>Lecture Title</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border  rounded py-1 px-2"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <p>Duration (minutes)</p>
                  <input
                    type="number"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <p>Lecture URL</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border  rounded py-1 px-2"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex gap-2 mb-4">
                  <p>Is Preview Free?</p>
                  <input
                    type="checkbox"
                    className="mt-1 scale-125"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                </div>

                <button
                  onClick={addLecture}
                  type="button"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add
                </button>

                <img
                  onClick={() => setShowPopup(false)}
                  src={assets.cross_icon}
                  className="absolute top-4 right-4 w-4 cursor-pointer"
                  alt=""
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-black text-white w-max py-2.5 px-8 rounded my-4 hover:bg-gray-800"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;