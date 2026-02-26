'use client';

import { useState, FormEvent } from 'react';

interface FormData {
    teamName: string;
    name: string;
    email: string;
    phone: string;
    college: string;
    member2Name: string;
    member2Email: string;
    member2Phone: string;
    member2College: string;
}

interface FieldErrors {
    teamName?: string;
    name?: string;
    email?: string;
    phone?: string;
    college?: string;
    member2Name?: string;
    member2Email?: string;
    member2Phone?: string;
    member2College?: string;
}

const WHATSAPP_LINK = 'https://chat.whatsapp.com/D3GwCvl3FszBRMpSOYMXUL';

export default function RegistrationForm() {
    const [form, setForm] = useState<FormData>({
        teamName: '', name: '', email: '', phone: '', college: '',
        member2Name: '', member2Email: '', member2Phone: '', member2College: '',
    });
    const [sameCollege, setSameCollege] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [globalError, setGlobalError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // Show member 2 section only once all leader fields have a value
    const leaderComplete =
        form.teamName.trim() !== '' &&
        form.name.trim() !== '' &&
        form.email.trim() !== '' &&
        form.phone.trim() !== '' &&
        form.college.trim() !== '';

    const validate = (): boolean => {
        const errors: FieldErrors = {};

        if (!form.teamName.trim()) errors.teamName = 'Team name is required.';
        if (!form.name.trim()) errors.name = 'Team leader name is required.';
        if (!form.email.trim()) {
            errors.email = 'Team leader email is required.';
        } else if (!emailRegex.test(form.email)) {
            errors.email = 'Enter a valid email address.';
        }
        if (!form.phone.trim()) {
            errors.phone = 'Team leader phone is required.';
        } else if (!phoneRegex.test(form.phone.replace(/\s/g, ''))) {
            errors.phone = 'Enter a valid 10-digit phone number.';
        }
        if (!form.college.trim()) errors.college = 'College name is required.';

        const isMember2Filled =
            form.member2Name.trim() !== '' ||
            form.member2Email.trim() !== '' ||
            form.member2Phone.trim() !== '' ||
            form.member2College.trim() !== '';

        if (isMember2Filled) {
            if (!form.member2Name.trim()) errors.member2Name = 'Member 2 name is required.';

            if (!form.member2Email.trim()) {
                errors.member2Email = 'Member 2 email is required.';
            } else if (!emailRegex.test(form.member2Email)) {
                errors.member2Email = 'Enter a valid email address.';
            }

            if (!form.member2Phone.trim()) {
                errors.member2Phone = 'Member 2 phone is required.';
            } else if (!phoneRegex.test(form.member2Phone.replace(/\s/g, ''))) {
                errors.member2Phone = 'Enter a valid 10-digit phone number.';
            }

            if (!sameCollege && !form.member2College.trim()) {
                errors.member2College = 'Member 2 college is required.';
            }
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (fieldErrors[name as keyof FieldErrors]) {
            setFieldErrors(prev => ({ ...prev, [name]: undefined }));
        }
        if (globalError) setGlobalError('');
    };

    const handleSameCollege = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setSameCollege(checked);
        setForm(prev => ({ ...prev, member2College: checked ? prev.college : '' }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setGlobalError('');

        const payload = {
            ...form,
            member2College: sameCollege ? form.college : form.member2College,
        };

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (data.success) {
                setSuccess(true);
            } else {
                setGlobalError(data.message || 'Something went wrong. Please try again.');
            }
        } catch {
            setGlobalError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {success && (
                <div className="success-overlay">
                    <div className="success-box">
                        <div className="success-icon">🩸</div>
                        <h2 className="success-title">You&apos;re In.</h2>
                        <p className="success-text">
                            Team <strong>{form.teamName}</strong> has been registered for <strong>Decenda 26</strong>.<br />
                            Welcome to the game. Join the WhatsApp group for updates.
                        </p>
                        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Join WhatsApp Group
                        </a>
                        <button className="close-success-btn" onClick={() => setSuccess(false)}>close</button>
                    </div>
                </div>
            )}

            <div className="form-card">
                <h2 className="section-title">Register Now</h2>
                <form onSubmit={handleSubmit} noValidate>
                    {globalError && <div className="form-global-error">⚠ {globalError}</div>}

                    {/* Team Name */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="teamName">Team Name</label>
                        <input
                            id="teamName" name="teamName" type="text"
                            className={`form-input${fieldErrors.teamName ? ' error' : ''}`}
                            placeholder="Enter your team name"
                            value={form.teamName} onChange={handleChange}
                        />
                        {fieldErrors.teamName && <p className="field-error">⚠ {fieldErrors.teamName}</p>}
                    </div>

                    {/* ── TEAM LEADER ── */}
                    <p className="form-section-label">Team Leader</p>

                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <input
                            id="name" name="name" type="text"
                            className={`form-input${fieldErrors.name ? ' error' : ''}`}
                            placeholder="Team leader's full name"
                            value={form.name} onChange={handleChange} autoComplete="name"
                        />
                        {fieldErrors.name && <p className="field-error">⚠ {fieldErrors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input
                            id="email" name="email" type="email"
                            className={`form-input${fieldErrors.email ? ' error' : ''}`}
                            placeholder="leader@example.com"
                            value={form.email} onChange={handleChange} autoComplete="email"
                        />
                        {fieldErrors.email && <p className="field-error">⚠ {fieldErrors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="phone">Phone Number</label>
                        <input
                            id="phone" name="phone" type="tel"
                            className={`form-input${fieldErrors.phone ? ' error' : ''}`}
                            placeholder="10-digit mobile number"
                            value={form.phone} onChange={handleChange} autoComplete="tel" maxLength={10}
                        />
                        {fieldErrors.phone && <p className="field-error">⚠ {fieldErrors.phone}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="college">College / Institution</label>
                        <input
                            id="college" name="college" type="text"
                            className={`form-input${fieldErrors.college ? ' error' : ''}`}
                            placeholder="Your college or institution name"
                            value={form.college} onChange={handleChange} autoComplete="organization"
                        />
                        {fieldErrors.college && <p className="field-error">⚠ {fieldErrors.college}</p>}
                    </div>

                    {/* ── MEMBER 2 — revealed only after leader is complete ── */}
                    {leaderComplete && (
                        <div className="member2-section">
                            <p className="form-section-label" style={{ marginTop: '0.4rem' }}>
                                Member 2
                                <span style={{ fontWeight: 300, fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: 1 }}>
                                    &nbsp;(optional)
                                </span>
                            </p>

                            <div className="form-group">
                                <label className="form-label" htmlFor="member2Name">Full Name</label>
                                <input
                                    id="member2Name" name="member2Name" type="text"
                                    className={`form-input${fieldErrors.member2Name ? ' error' : ''}`}
                                    placeholder="Member 2's full name"
                                    value={form.member2Name} onChange={handleChange}
                                />
                                {fieldErrors.member2Name && <p className="field-error">⚠ {fieldErrors.member2Name}</p>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="member2Email">Email Address</label>
                                <input
                                    id="member2Email" name="member2Email" type="email"
                                    className={`form-input${fieldErrors.member2Email ? ' error' : ''}`}
                                    placeholder="member2@example.com"
                                    value={form.member2Email} onChange={handleChange}
                                />
                                {fieldErrors.member2Email && <p className="field-error">⚠ {fieldErrors.member2Email}</p>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="member2Phone">Phone Number</label>
                                <input
                                    id="member2Phone" name="member2Phone" type="tel"
                                    className={`form-input${fieldErrors.member2Phone ? ' error' : ''}`}
                                    placeholder="10-digit mobile number"
                                    value={form.member2Phone} onChange={handleChange} maxLength={10}
                                />
                                {fieldErrors.member2Phone && <p className="field-error">⚠ {fieldErrors.member2Phone}</p>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="member2College">College / Institution</label>
                                <label className="same-college-check">
                                    <input
                                        type="checkbox"
                                        checked={sameCollege}
                                        onChange={handleSameCollege}
                                    />
                                    <span>Same as Team Leader</span>
                                </label>
                                {!sameCollege && (
                                    <>
                                        <input
                                            id="member2College" name="member2College" type="text"
                                            className={`form-input${fieldErrors.member2College ? ' error' : ''}`}
                                            placeholder="Member 2's college or institution"
                                            value={form.member2College} onChange={handleChange}
                                            style={{ marginTop: '0.5rem' }}
                                        />
                                        {fieldErrors.member2College && <p className="field-error" style={{ marginTop: '0.25rem' }}>⚠ {fieldErrors.member2College}</p>}
                                    </>
                                )}
                                {sameCollege && (
                                    <p className="same-college-note">{form.college}</p>
                                )}
                            </div>
                        </div>
                    )}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Registering...' : "Register Team — It's Free"}
                    </button>
                </form>
            </div>
        </>
    );
}
