import { useState, type ReactNode } from "react";
import './Tabs.css';

interface TabItem {
    label: string;
    content: ReactNode;
}

interface TabsProps {
    items: TabItem[];
}

export default function Tabs({ items }: TabsProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <div className="tabs-header">
                {items.map((tab, index) => (
                    <button
                        key={tab.label}
                        className={activeTab === index ? "active" : ""}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="tabs-content">
                {items[activeTab].content}
            </div>
        </>
    );
}