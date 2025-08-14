// src/components/common/Calendar28.jsx
import {useState, useMemo} from 'react';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Calendar as CalendarIcon} from 'lucide-react'; // ✅ lucide-react 아이콘 사용
const fmt = (d) =>
  d
    ? new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
        .format(d)
        .replace(/\.$/, '')
    : '';

export function Calendar28({value, onChange, placeholder = '날짜를 선택하세요', className = ''}) {
  const [open, setOpen] = useState(false);
  const selectedDate = useMemo(() => (value ? new Date(value) : undefined), [value]);
  const isEmpty = !selectedDate;
  const colorCls = isEmpty ? 'text-muted-foreground' : 'text-black'; // 선택 전 회색, 선택 후 블랙

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setOpen(true)}
            className={`w-[155px] h-[48px] mb-[24px] select-[#4A4644] border rounded-[12px] px-[16px] py-[12px] flex items-center gap-[8px] bg-background ${colorCls}`}
          >
            <CalendarIcon className="h-[16px] w-[16px] " />
            <span className="font-[300]">{isEmpty ? placeholder : fmt(selectedDate)}</span>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" side="right" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(d) => {
              if (!d) return;
              onChange(d.toISOString().slice(0, 10));
              setOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
