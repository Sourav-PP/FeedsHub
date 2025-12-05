import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/textArea';
import { createArticleSchema, type CreateArticleFormValues } from '../schemas/createArticleSchema';
import { useCreateArticle } from '../hooks/useCreateArticle';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useCategories } from '../../auth/hooks/useCategories';

const CreateArticleForm = () => {
  const { create } = useCreateArticle();
  const { categories, getCategories } = useCategories();
  const [tagInput, setTagInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
    reset,
  } = useForm<CreateArticleFormValues>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      tags: [],
    },
  });

  const tags = useWatch({ control, name: 'tags' }) || [];

  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    if (!tagInput.trim()) return;

    const newTag = tagInput.trim().toLowerCase();
    if (tags.includes(newTag)) {
      setTagInput('');
      return;
    }

    setValue('tags', [...tags, newTag]);
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter((t) => t !== tagToRemove),
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const onSubmit = async (data: CreateArticleFormValues) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);

    data.tags.forEach((tag) => {
      formData.append('tags', tag);
    });
    if (data.file?.[0]) {
      formData.append('file', data.file[0]);
    }

    const result = await create(formData);
    if (result.success) {
      toast.success(result.message || 'Article published!');
      reset();
      reset({ tags: [] });
    } else {
      toast.error(result.message || 'Failed to create article');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Form */}
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-10 lg:p-12 border border-white/50">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              Write Your Story
            </h1>
            <p className="mt-1 text-lg text-gray-600">Share your knowledge with the community</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Title */}
            <Input
              label="Article Title"
              placeholder="e.g., How AI will change the world"
              // className="text-lg"
              {...register('title')}
              error={errors.title}
            />

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Article Content
              </label>
              <Textarea
                placeholder="Start writing your story..."
                rows={12}
                className="w-full rounded-xl bg-gray-200/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                {...register('description')}
                error={errors.description}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
              <select
                {...register('category')}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-400/50 outline-none transition bg-white"
              >
                <option value="">Choose a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-2">{errors.category.message}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e)}
                  placeholder="Type and press Enter or click Add"
                  className="flex-1 px-5 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-400/50 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-8 py-3 bg-linear-to-r from-[#5C68FF] to-[#70A5FF] text-white font-semibold rounded-2xl transition transform hover:scale-105 active:scale-100"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-5 py-1 text-white bg-amber-100 bg-linear-to-r from-[#5C68FF] to-[#70A5FF] rounded-full font-medium"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-black font-extrabold text-lg cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {errors.tags && <p className="text-red-500 text-sm mt-2">{errors.tags.message}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Cover Image</label>

              {previewUrl && (
                <div className="mb-4">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full max-h-80 object-contain rounded-2xl border"
                  />
                </div>
              )}

              <div className="border-2 border-dashed border-cyan-300 rounded-2xl p-8 text-center hover:bg-cyan-50/20 transition">
                <input
                  type="file"
                  accept="image/*"
                  {...register('file')}
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => {
                    register('file').onChange(e); // react-hook-form
                    handleFileChange(e); // preview
                  }}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-cyan-600 font-semibold hover:text-cyan-700"
                >
                  Click to upload
                </label>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
              </div>

              {errors.file && (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <p className="text-red-500 text-sm mt-2">{(errors.file as any)?.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-[#5C68FF] to-[#70A5FF] text-white font-medium text-xl py-3 rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'Publishing Your Story...' : 'Publish Article'}
            </button>
          </form>
        </div>

        {/* Right: Beautiful Illustration */}
        <div className="hidden lg:block relative h-full min-h-[700px] rounded-3xl overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1200&h=1600&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <h2 className="text-5xl font-bold mb-4">Share Your Inspiring Story</h2>
            <p className="text-xl opacity-90">
              Every person has a story. Every story inspires change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticleForm;
