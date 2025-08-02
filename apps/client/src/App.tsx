import { useState } from 'react';
import { useImageGeneration } from './hooks/useImageGeneration';
import type { GeneratedImage } from './types/api';

function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const imageGeneration = useImageGeneration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      const result = await imageGeneration.mutateAsync({
        prompt: prompt.trim(),
        width: 1024,
        height: 1024,
      });
      setGeneratedImages(prev => [result, ...prev]);
      setPrompt('');
    } catch (error) {
      console.error('Failed to generate image:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">AI 이미지 생성기</h1>
          <p className="text-gray-600 mt-1">
            상상하는 모든 것을 이미지로 만들어보세요
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            어떤 이미지를 만들고 싶으신가요?
          </h2>
          <p className="text-xl text-gray-600">
            간단한 텍스트로 원하는 이미지를 생성해보세요
          </p>
        </div>

        {/* Prompt Input Section */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  프롬프트 입력
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-4 text-lg border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows={4}
                  placeholder="예: 해질녘 바다 위를 나는 용, 판타지 스타일"
                  disabled={imageGeneration.isPending}
                />
              </div>

              <button 
                type="submit"
                disabled={!prompt.trim() || imageGeneration.isPending}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-semibold py-4 px-8 rounded-xl transition-colors"
              >
                {imageGeneration.isPending ? '이미지 생성 중...' : '이미지 생성하기'}
              </button>
            </div>
          </div>
        </form>

        {/* Error Message */}
        {imageGeneration.isError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <p className="text-red-800">
              이미지 생성에 실패했습니다. 다시 시도해주세요.
            </p>
          </div>
        )}

        {/* Generated Images Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">생성된 이미지</h3>
          
          {generatedImages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              이미지를 생성하면 여기에 표시됩니다
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generatedImages.map((image, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.prompt}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-gray-900 font-medium mb-2">{image.prompt}</p>
                    <p className="text-sm text-gray-500">
                      {image.width} × {image.height} · {new Date(image.generatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
