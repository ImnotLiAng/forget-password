import React, { useState, useRef } from 'react';
import './index.css'; // 引入样式

const DragButton = ({vertified, setVertified} : { vertified: boolean; setVertified: (val: boolean) => void }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [dragging, setDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0); // 当前按钮位置，百分比

  const containerWidth = containerRef.current?.offsetWidth ?? 0;
  const buttonWidth = buttonRef.current?.offsetWidth ?? 0;

  // 处理鼠标或触摸开始事件
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (vertified) setVertified(false);
    setDragging(true);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || !containerRef.current) return;

    // 获取触摸点或鼠标点的 X 坐标
    const clientX =
      'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;

    const containerLeft = containerRef.current.getBoundingClientRect().left;

    // 计算按钮的新位置
    const deltaX = clientX - containerLeft;
    const limitedDeltaX = Math.min(
      Math.max(deltaX, buttonWidth / 2),
      containerWidth - buttonWidth / 2
    );

    const newPosition = (limitedDeltaX - buttonWidth / 2) / (containerWidth - buttonWidth);
    setPosition(newPosition);
  };

  // 处理鼠标或触摸结束事件
  const handleEnd = () => {
    if (position >= 0.8) {
      setPosition(1); // 滑动超过 80%，移动到终点
      setVertified(true);
    } else {
      setPosition(0); // 回弹到起点
    }

    setDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="drag-container"
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      style={{
        width: '100%',
        height: '50px',
        position: 'relative',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
      Please slide to vertify
      {/* 动态背景 */}
      <div
        className="drag-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${position * 100}%`,
          transition: dragging ? 'none' : 'width 0.3s ease-in-out',
        }}
      />
      {/* 按钮 */}
      <button
        ref={buttonRef}
        className="drag-button"
        style={{
          position: 'absolute',
          left: 0,
          transform: `translateX(calc(${position * (containerWidth - buttonWidth)}px))`,
          cursor: dragging ? 'grabbing' : 'grab',
          transition: dragging ? 'none' : 'transform 0.3s ease-in-out',
        }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {!vertified ? `>>` : '✔️'}
      </button>
    </div>
  );
};

export default DragButton;
