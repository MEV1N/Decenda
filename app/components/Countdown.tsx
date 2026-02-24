'use client';

import { useEffect, useState } from 'react';

const TARGET = new Date('2026-03-06T09:00:00+05:30').getTime();

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calc(): TimeLeft {
    const diff = Math.max(0, TARGET - Date.now());
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

function pad(n: number) {
    return String(n).padStart(2, '0');
}

export default function Countdown() {
    const [time, setTime] = useState<TimeLeft>(calc());

    useEffect(() => {
        const id = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(id);
    }, []);

    const isOver = TARGET - Date.now() <= 0;

    if (isOver) {
        return (
            <p className="countdown-over">The event has begun. Good luck.</p>
        );
    }

    return (
        <div className="countdown-wrap">
            <p className="countdown-label">Event starts in</p>
            <div className="countdown-grid">
                <div className="countdown-unit">
                    <span className="countdown-num">{pad(time.days)}</span>
                    <span className="countdown-tag">Days</span>
                </div>
                <span className="countdown-sep">:</span>
                <div className="countdown-unit">
                    <span className="countdown-num">{pad(time.hours)}</span>
                    <span className="countdown-tag">Hours</span>
                </div>
                <span className="countdown-sep">:</span>
                <div className="countdown-unit">
                    <span className="countdown-num">{pad(time.minutes)}</span>
                    <span className="countdown-tag">Mins</span>
                </div>
                <span className="countdown-sep">:</span>
                <div className="countdown-unit">
                    <span className="countdown-num">{pad(time.seconds)}</span>
                    <span className="countdown-tag">Secs</span>
                </div>
            </div>
        </div>
    );
}
