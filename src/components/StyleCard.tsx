import { Wallet, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { DanceStyle } from '@/lib/db';
import { getLocalizedText } from './../lib/utils';

interface StyleCardProps {
    style: DanceStyle;
}
/*
const styleImages: { [key: string]: string } = {
  'High Heels': 'https://images.unsplash.com/photo-1642157690261-d8b52223c9fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwaGVlbHMlMjBkYW5jZXxlbnwxfHx8fDE3NjQzMjIwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'Kids Hip-Hop': 'https://images.unsplash.com/photo-1680260608965-332553b06c55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwZGFuY2luZyUyMGNsYXNzfGVufDF8fHx8MTc2NDMyMjA1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  'Contemporary': 'https://images.unsplash.com/photo-1550026593-cb89847b168d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBkYW5jZXxlbnwxfHx8fDE3NjQyMzY1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'Ballet for Kids': 'https://images.unsplash.com/photo-1604156179346-54db4306febf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxsZXQlMjBraWRzJTIwZGFuY2V8ZW58MXx8fHwxNzY0MzIyMDUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Jazz-Funk': 'https://images.unsplash.com/photo-1757439160077-dd5d62a4d851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwZGFuY2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjQzMjIwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'Argentine Tango': 'https://images.unsplash.com/photo-1555489387-f7fa3290a63b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW5nbyUyMGRhbmNlcnN8ZW58MXx8fHwxNzY0MzIyMDUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Creative Movement': 'https://images.unsplash.com/photo-1680260608965-332553b06c55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwZGFuY2luZyUyMGNsYXNzfGVufDF8fHx8MTc2NDMyMjA1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  'Stretching & Flexibility': 'https://images.unsplash.com/photo-1607909599990-e2c4778e546b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJldGNoaW5nJTIwZmxleGliaWxpdHl8ZW58MXx8fHwxNzY0MjAwNTg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Hip-Hop': 'https://images.unsplash.com/photo-1565784796667-98515d255f7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBkYW5jZXJ8ZW58MXx8fHwxNzY0MjQ0MDkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
};
*/

export function StyleCard({ style }: StyleCardProps) {
  const { t, language } = useLanguage();
  
  const getText = (json: any) => getLocalizedText(json, language);

  const getLevelColor = (level: string) => {
    if (level === 'Beginner') return 'bg-teal-50 text-teal-700';
    if (level === 'Intermediate') return 'bg-orange-50 text-orange-700';
    if (level === 'Advanced') return 'bg-purple-50 text-purple-700';
    return 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Image with Gradient Overlay */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <ImageWithFallback
          src={style.image_url || '/default.jpg'}
          alt={getText(style.name)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${style.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-8">
        <div className="flex items-start justify-between mb-3 md:mb-4 gap-2">
          <h3 className={`text-lg md:text-xl lg:text-2xl text-gray-900 group-hover:text-purple-600 transition-all`}>
            {getText(style.name)}
          </h3>
          <span className={`px-3 md:px-4 py-1 md:py-1.5 ${getLevelColor(style.level)} rounded-full text-xs md:text-sm whitespace-nowrap`}>
            {style.level}
          </span>
        </div>

        <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">{getText(style.description)}</p>

        <div className="flex gap-2 md:gap-3">
          <Link href="/schedule" className="flex-1">
            <button className={`w-full bg-gradient-to-r ${style.gradient} text-white py-2.5 md:py-3 rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base`}>
              <Wallet className="w-3 h-3 md:w-4 md:h-4" />
              {t('common.book')}
            </button>
          </Link>
          <button className="px-3 md:px-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-full hover:border-gray-300 transition-all group-hover:border-gray-300">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
