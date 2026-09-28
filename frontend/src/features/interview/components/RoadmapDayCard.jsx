import React, { useState } from 'react';
import { Calendar, CheckSquare, Square, Award } from 'lucide-react';

const RoadmapDayCard = ({ planItem, onTaskToggle }) => {
  const { day, focus, tasks = [] } = planItem;
  const [completedIndices, setCompletedIndices] = useState(new Set());

  const toggleTask = (index) => {
    setCompletedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      if (onTaskToggle) {
        onTaskToggle(day, index, next.has(index));
      }
      return next;
    });
  };

  const isAllCompleted = tasks.length > 0 && completedIndices.size === tasks.length;

  return (
    <div
      className="roadmap-day-card"
      style={{
        borderColor: isAllCompleted ? 'rgba(16, 185, 129, 0.4)' : undefined,
        background: isAllCompleted
          ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, rgba(14, 22, 37, 0.75) 100%)'
          : undefined,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="day-badge">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={13} />
              <span>Day {day}</span>
            </span>
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {completedIndices.size} of {tasks.length} tasks ready
          </span>
        </div>

        {isAllCompleted && (
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Award size={13} />
            <span>Day Milestone Complete</span>
          </span>
        )}
      </div>

      <h3
        style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '14px',
          letterSpacing: '-0.01em',
        }}
      >
        {focus}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {tasks.map((task, idx) => {
          const isDone = completedIndices.has(idx);
          return (
            <div
              key={idx}
              className="task-checkbox-item"
              onClick={() => toggleTask(idx)}
              style={{
                background: isDone ? 'rgba(16, 185, 129, 0.06)' : undefined,
                border: isDone ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid transparent',
              }}
            >
              <div
                style={{
                  color: isDone ? '#34d399' : 'var(--text-muted)',
                  marginTop: '2px',
                  flexShrink: 0,
                }}
              >
                {isDone ? <CheckSquare size={17} /> : <Square size={17} />}
              </div>
              <span className={`task-text ${isDone ? 'completed' : ''}`}>
                {task}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapDayCard;
