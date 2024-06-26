import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { langActions } from '../../../redux/slices/langSlide';
import { langSelector } from '../../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';

export default function ChooseLanguage() {
    const [lang, setLang] = useState('Vi');
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const language = useSelector(langSelector);

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    return (
        <div className="group relative">
            <button className="flex w-12 items-center space-x-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                </svg>
                <span>{lang}</span>
            </button>

            <div className="invisible absolute -right-[4px] top-full z-50 w-[200px] overflow-hidden rounded-md bg-white shadow group-hover:visible">
                <button
                    className={clsx(
                        'flex w-full items-center justify-center py-3 hover:bg-green-100',
                        {
                            'font-semibold': lang === 'Vi',
                        },
                    )}
                    onClick={() => {
                        setLang('Vi'), dispatch(langActions.vi());
                    }}
                >
                    Tiếng Việt
                </button>
                <button
                    className={clsx(
                        'flex w-full items-center justify-center py-3 hover:bg-green-100',
                        {
                            'font-semibold': lang === 'En',
                        },
                    )}
                    onClick={() => {
                        setLang('En'), dispatch(langActions.en());
                    }}
                >
                    English
                </button>
            </div>
        </div>
    );
}
