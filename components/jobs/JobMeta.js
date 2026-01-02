
import React from 'react';
import { MapPin, Clock, DollarSign, Briefcase, Zap, Trophy, Calendar } from 'lucide-react';

export const JobMetaItem = ({ icon: Icon, text, subtext, color = "text-slate-500", iconColor = "text-slate-400" }) => {
    if (!text) return null;
    return (
        <div className={`flex items-center gap-2 ${color} text-sm`}>
            {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
            <span className="truncate">
                {text}
                {subtext && <span className="text-xs opacity-70 ml-1">{subtext}</span>}
            </span>
        </div>
    );
};

export const JobMetaGrid = ({ location, salary, type, posted, experience, className = "grid grid-cols-2 gap-y-2 gap-x-4" }) => {
    return (
        <div className={className}>
            {location && <JobMetaItem icon={MapPin} text={location} />}
            {salary && <JobMetaItem icon={DollarSign} text={salary} color="text-slate-900 font-medium" iconColor="text-green-500" />}
            {type && <JobMetaItem icon={Briefcase} text={type} />}
            {posted && <JobMetaItem icon={Clock} text={`Posted ${posted}`} />}
            {experience && <JobMetaItem icon={Trophy} text={experience} iconColor="text-yellow-500" />}
        </div>
    );
};
