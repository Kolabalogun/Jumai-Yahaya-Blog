import React, { useEffect, useState } from "react";

import "@pathofdev/react-tag-input/build/index.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../Utils/Firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import AuthNav from "../Auth/AuthNav";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AnimatedPage from "../Utils/AnimatedPage";
import Line from "../components/Home/Line";

const initialState = {
  title: "",
  category: "",
  description: "",
};
const categoryOptions = ["Type-A", "Type-B", "Type-C", "Type-D"];

const EditBlog = ({ user, pageType, pageTypeF, handleLogout }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [form, setform] = useState(initialState);
  const [file, setfile] = useState(null);
  const [progress, setprogress] = useState(null);
  const [dateId, setdateId] = useState("");

  const { title, category, description } = form;

  function handleCategory(e) {
    setform({ ...form, category: e.target.value });
  }

  // to set timeId
  useEffect(() => {
    const dateId = new Date().getTime();
    setdateId(dateId);
  }, []);

  // to see the type of page
  useEffect(() => {
    pageTypeF("editBlog");
  }, []);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          toast("Upload is " + progress + "% done");
          // console.log("Upload is " + progress + "% done");

          setprogress(progress);
          switch (snapshot.state) {
            case "paused":
              toast("Upload is paused");
              break;
            case "running":
              // toast("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image Uploaded Successfully ");
            setform((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);

    if (title && file && description) {
      // if we adding new blog

      try {
        await addDoc(collection(db, "blogs"), {
          ...form,
          timestamp: serverTimestamp(),
          author: user.displayName,
          userId: user.uid,
          dateId: dateId,
          comment: [],
        });
        toast.success("Blog successfully added");
      } catch (err) {
        console.log(err);
      }
    } else {
      return toast.error("All fields must be filled");
    }
    navigate("/blog");
  };

  // for update Blog

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setform({ ...snapshot.data() });
    }
  };
  const updateBlog = async (e) => {
    e.preventDefault();
    // console.log(form);

    if (title && file && description) {
      // if we adding new blog

      try {
        await updateDoc(doc(db, "blogs", id), {
          ...form,
          timestamp: serverTimestamp(),
          // author: user.displayName,
          // userId: user.uid,
        });
        toast.success("Blog successfully updated");
      } catch (err) {
        console.log(err);
      }
    } else {
      return toast.error("All fields must be filled");
    }
    navigate("/blog");
    // console.log(form);
  };

  // handling Short Note

  const [note, noteF] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "notes"),

      (snapshot) => {
        let list;

        snapshot.docs.forEach((doc) => {
          list = { id: doc.id, ...doc.data() };
        });

        noteF(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  // console.log(note);

  const handleNoteChange = (e) => {
    noteF(e.target.value);
  };

  const handleNote = async (e) => {
    e.preventDefault();

    if (note) {
      // if we adding new note

      try {
        await updateDoc(doc(db, "notes", "KzesnvCACmej3FlKc0NZ"), {
          note: note,
        });
        toast.success("Note successfully updated");
      } catch (err) {
        console.log(err);
      }
    } else {
      return toast.error("field must be filled");
    }
    navigate("/");
  };

  // handling About Note

  const [about, aboutF] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "abouts"),

      (snapshot) => {
        let list;

        snapshot.docs.forEach((doc) => {
          list = { id: doc.id, ...doc.data() };
        });

        aboutF(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  // console.log(about);

  const handleAboutChange = (e) => {
    aboutF(e.target.value);
  };

  const handleAbout = async (e) => {
    e.preventDefault();

    if (about) {
      // if we adding new about

      try {
        await updateDoc(doc(db, "abouts", "y6C13rKNEfeeBdR7ynCX"), {
          about: about,
        });
        toast.success("About successfully updated");
      } catch (err) {
        console.log(err);
      }
    } else {
      return toast.error("field must be filled");
    }
    navigate("/about");
  };

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth");
  //   }
  // });

  return (
    <AnimatedPage>
      <AuthNav user={user} pageType={pageType} handleLogout={handleLogout} />
      <div className="authBody">
        <div className="authform">
          <form style={{ marginBottom: "30px" }}>
            <div className="authTitle">
              <h3>{id ? "Update Blog" : "Create Blog"}</h3>
            </div>

            <input
              type="text"
              onChange={handleChange}
              value={title}
              required
              minLength={4}
              placeholder="Title"
              name="title"
            />
            <select value={category} onChange={handleCategory}>
              <option>Please select category</option>
              {categoryOptions.map((opt, index) => (
                <option value={opt} key={index}>
                  {opt}
                </option>
              ))}
            </select>
            <textarea
              type="text"
              onChange={handleChange}
              value={description}
              required
              rows={17}
              minLength={4}
              placeholder="Description"
              name="description"
            />

            <input
              type="file"
              name="file"
              onChange={(e) => setfile(e.target.files[0])}
            />

            {id ? (
              <button
                onClick={updateBlog}
                disabled={progress !== null && progress < 100}
              >
                Update Blog
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={progress !== null && progress < 100}
              >
                Add Blog
              </button>
            )}
          </form>

          <Line />

          <form style={{ marginBottom: "30px" }}>
            <div className="authTitle">
              <h3>Edit Notes</h3>
            </div>

            <textarea
              type="text"
              onChange={handleNoteChange}
              value={note.note}
              required
              rows={10}
              minLength={4}
              placeholder="note"
              name="note"
            />

            <button onClick={handleNote}>Submit Note</button>
          </form>

          <Line />
          <form style={{ marginBottom: "30px" }}>
            <div className="authTitle">
              <h3>Edit About</h3>
            </div>

            <textarea
              type="text"
              onChange={handleAboutChange}
              value={about.about}
              required
              rows={10}
              minLength={4}
              placeholder="about me..."
              name="about"
            />

            <button onClick={handleAbout}>Submit Note</button>
          </form>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default EditBlog;
