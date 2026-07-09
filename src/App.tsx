import { useState } from "react";

function Button({ variant = "primary", children, ...props }: { variant?: "primary" | "secondary" | "danger"; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50";
  const v = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-600 active:scale-95",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95",
    danger: "bg-red-500 text-white hover:bg-red-600 active:scale-95",
  };
  return <button className={`${base} ${v[variant]}`} {...props}>{children}</button>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-6 ${className}`}>{children}</div>;
}

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/30" />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 z-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Toast({ message, show }: { message: string; show: boolean }) {
  if (!show) return null;
  return <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg text-sm animate-bounce">{message}</div>;
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700 text-sm" {...props} />
    </div>
  );
}

const CodeBlock = ({ code }: { code: string }) => <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-lg overflow-x-auto mt-3 font-mono">{code}</pre>;

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOn, setToastOn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [clickCount, setClickCount] = useState(0);

  function showToast() { setToastOn(true); setTimeout(() => setToastOn(false), 2000); }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">🎨 UI Components</h1>
        <p className="text-sm text-gray-400 mt-1">React + Tailwind CSS 组件库演示</p>
      </header>
      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-10">
        {/* Button */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Button 按钮</h2>
          <div className="flex flex-wrap gap-3 mb-2">
            <Button onClick={() => setClickCount((c) => c + 1)}>Primary ({clickCount})</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button disabled>Disabled</Button>
          </div>
          <CodeBlock code={`<Button variant="primary">Primary</Button>\n<Button variant="secondary">Secondary</Button>`} />
        </Card>
        {/* Card */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Card 卡片</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["React", "TypeScript", "Tailwind"].map((t) => (
              <div key={t} className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <p className="font-semibold text-gray-700">{t}</p>
                <p className="text-xs text-gray-400 mt-1">技术标签</p>
              </div>
            ))}
          </div>
          <CodeBlock code={`<Card>\n  <h2>Title</h2>\n  <p>Content</p>\n</Card>`} />
        </Card>
        {/* Modal */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Modal 弹窗</h2>
          <Button onClick={() => setModalOpen(true)}>打开弹窗</Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="确认操作">
            <p className="text-gray-600 text-sm mb-4">确定要执行此操作吗？</p>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>取消</Button>
              <Button onClick={() => { setModalOpen(false); showToast(); }}>确定</Button>
            </div>
          </Modal>
          <CodeBlock code={`<Modal open={open} onClose={close} title="标题">内容</Modal>`} />
        </Card>
        {/* Toast */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Toast 提示</h2>
          <Button onClick={showToast}>显示提示</Button>
          <Toast message="操作成功！" show={toastOn} />
          <CodeBlock code={`<Toast message="操作成功！" show={show} />`} />
        </Card>
        {/* Input */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Input 输入框</h2>
          <div className="max-w-sm">
            <Input label="用户名" placeholder="请输入用户名" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <Input label="密码" type="password" placeholder="请输入密码" />
            {inputValue && <p className="text-sm text-gray-400 mt-1">已输入: {inputValue}</p>}
          </div>
          <CodeBlock code={`<Input label="用户名" placeholder="请输入" />`} />
        </Card>
      </div>
    </div>
  );
}
