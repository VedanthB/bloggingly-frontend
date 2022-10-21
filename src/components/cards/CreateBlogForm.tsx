import React from "react";
import { useAppSelector } from "../../app/hooks";
import { IBlog, InputChange } from "../../utils/TypeScript";

interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}

const CreateBlogForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const {
    category: { categories },
  } = useAppSelector((state) => state);

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleChangeThumbnail = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setBlog({ ...blog, thumbnail: file });
    }
  };
  return (
    <div>
      <form>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            value={blog.title}
            name="title"
            onChange={handleChangeInput}
            type="text"
            id="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Blog Title"
            required
          />
          <small className="text-gray-500">{blog.title.length}/50</small>
        </div>

        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="thumbnail"
          >
            Upload Thumbnail
          </label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            id="thumbnail"
            accept="image/*"
            onChange={handleChangeThumbnail}
            type="file"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            value={blog.description}
            id="description"
            rows={4}
            onChange={handleChangeInput}
            name="description"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Blog description..."
          ></textarea>
          <small className="text-gray-500">{blog.description.length}/200</small>
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select Category
          </label>

          <select
            value={blog.category}
            name="category"
            onChange={handleChangeInput}
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>Choose a category</option>

            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
