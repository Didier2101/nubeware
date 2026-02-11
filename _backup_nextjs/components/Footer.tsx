/**
 * Professional Enterprise Footer - Nubeware
 * Diseño limpio basado en blancos y grises de alta fidelidad.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useGlobalTranslation } from '@/src/providers/GlobalLanguageProvider';
import { Sparkles, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
    const { t } = useGlobalTranslation();

    return (
        <footer className="bg-slate-50 border-t border-slate-200 py-20 px-6 lg:px-12 mt-auto">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-2 space-y-8">
                        <Link href="/" className="flex items-center space-x-3 group w-fit">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                                <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-xl font-extrabold text-slate-900">
                                Nube<span className="text-primary">ware</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 font-medium max-w-sm leading-relaxed">
                            {t.footer_desc}
                        </p>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-primary hover:border-primary/20 rounded-xl transition-all"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-primary hover:border-primary/20 rounded-xl transition-all"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-primary hover:border-primary/20 rounded-xl transition-all"><Github className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-extrabold text-slate-900 mb-6 uppercase tracking-widest text-[12px]">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link href="/services" className="text-slate-500 font-bold hover:text-primary transition-colors text-[14px]">{t.nav_services}</Link></li>
                            <li><Link href="/services/ai-solutions/rag" className="text-slate-500 font-bold hover:text-primary transition-colors text-[14px]">{t.nav_rag}</Link></li>
                            <li><Link href="/services/about" className="text-slate-500 font-bold hover:text-primary transition-colors text-[14px]">{t.nav_about}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-extrabold text-slate-900 mb-6 uppercase tracking-widest text-[12px]">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="/services/privacy" className="text-slate-500 font-bold hover:text-primary transition-colors text-[14px]">{t.footer_privacy}</Link></li>
                            <li><Link href="/services/terms" className="text-slate-500 font-bold hover:text-primary transition-colors text-[14px]">{t.footer_terms}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-slate-400 font-bold text-[13px]">{t.footer_rights}</p>
                    <div className="flex items-center space-x-8 text-[13px] font-bold text-slate-400">
                        <span className="hover:text-primary cursor-pointer transition-colors leading-none truncate">ISO 27001 Certified</span>
                        <span className="hover:text-primary cursor-pointer transition-colors leading-none truncate">SOC2 Type II</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
