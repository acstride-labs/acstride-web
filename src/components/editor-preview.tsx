'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Check, ChevronDown, Code2, FileText, Play, Terminal} from 'lucide-react';

const examples = [
  {input: '6 6 4', output: '4', cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n, m, a;\n    cin >> n >> m >> a;\n\n    cout << ((n+a-1)/a)\n          * ((m+a-1)/a);\n    return 0;\n}', py: 'n, m, a = map(int, input().split())\n\nrows = (n + a - 1) // a\ncols = (m + a - 1) // a\n\nprint(rows * cols)'},
  {input: '3\n1 1 0\n1 1 1\n1 0 0', output: '2', cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n, a, b, c, ans = 0;\n    cin >> n;\n    while (n--) {\n        cin >> a >> b >> c;\n        ans += (a+b+c >= 2);\n    }\n    cout << ans;\n}', py: 'n = int(input())\nsolved = 0\n\nfor _ in range(n):\n    votes = map(int, input().split())\n    solved += sum(votes) >= 2\n\nprint(solved)'},
  {input: '8', output: 'YES', cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int w;\n    cin >> w;\n\n    cout << (w > 2 && w % 2 == 0\n             ? "YES" : "NO");\n}', py: 'w = int(input())\n\ncan_split = w > 2 and w % 2 == 0\n\nprint("YES" if can_split else "NO")'}
];
function highlight(line: string) {
  return line.split(/("[^"]*"|\b(?:int|long|return|using|namespace|while|cout|cin|print|for|in|range|if|else|and|map|input|sum|include)\b|\b\d+\b)/g).map((part, i) => <span key={i} className={/^"/.test(part) ? 'syntax-string' : /^\d/.test(part) ? 'syntax-number' : /^(int|long|return|using|namespace|while|cout|cin|print|for|in|range|if|else|and|map|input|sum|include)$/.test(part) ? 'syntax-keyword' : undefined}>{part}</span>);
}
export function EditorPreview() {
  const t = useTranslations('demo');
  const [problem, setProblem] = useState(0);
  const [language, setLanguage] = useState('cpp');
  const [state, setState] = useState('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function reset() { if (timer.current) clearTimeout(timer.current); setState('idle'); }
  const item = examples[problem];
  const letter = ['A', 'B', 'C'][problem];
  const title = t(['problemA', 'problemB', 'problemC'][problem]);
  return <figure className="editor-figure">
    <div className="editor-window">
      <div className="window-bar"><div className="traffic"><i/><i/><i/></div><span>ACStride <span className="dim">/</span> {t('contest')}</span><span className="window-chip">VS CODE</span></div>
      <div className="editor-body">
        <div className="problem-rail" role="tablist" aria-label={t('statement')}>
          {['A','B','C'].map((p,i) => <button key={p} id={`preview-tab-${i}`} role="tab" tabIndex={problem===i?0:-1} aria-selected={problem===i} aria-controls="preview-solution" onClick={() => {reset(); setProblem(i);}} onKeyDown={event=>{
            const keys=['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'];
            if(!keys.includes(event.key)) return;
            event.preventDefault();
            const next=event.key==='Home'?0:event.key==='End'?2:(i+(event.key==='ArrowRight'||event.key==='ArrowDown'?1:2))%3;
            reset(); setProblem(next);
            event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus();
          }}>{p}{state==='done' && problem===i ? <i/> : null}</button>)}<span className="rail-line"/><Code2 size={17}/>
        </div>
        <div className="statement-pane"><div className="pane-title"><FileText size={13}/>{t('statement')}</div><h3><span>{letter}.</span> {title}</h3><div className="problem-meta">1 s <span>·</span> 256 MB</div><p>{t(['descA','descB','descC'][problem])}</p><div className="math-illustration" aria-hidden="true">{problem===0 ? <div className="tile-grid">{Array.from({length:9},(_,i)=><i key={i} className={i>3 ? 'muted-tile' : ''}/>)}</div> : <div className="formula">{problem===1 ? 'a + b + c ≥ 2' : 'w ≡ 0 (mod 2)'}</div>}</div><div className="sample-title">{t('input')}</div><pre>{item.input}</pre><div className="sample-title">{t('expected')}</div><pre>{item.output}</pre></div>
        <div className="solution-pane" id="preview-solution" role="tabpanel" aria-labelledby={`preview-tab-${problem}`}><div className="code-bar"><span><Code2 size={13}/>{language==='cpp' ? 'main.cpp' : 'main.py'}</span><label><select aria-label={t('language')} value={language} onChange={e=>{reset();setLanguage(e.target.value);}}><option value="cpp">C++20</option><option value="py">Python 3</option></select><ChevronDown size={12}/></label></div>
          <pre className="code-lines">{(language==='cpp'?item.cpp:item.py).split('\n').map((line,i)=><div key={i}><span className="line-number" aria-hidden="true">{i+1}</span><code>{highlight(line)||' '}</code></div>)}</pre>
          <div className="tests-preview"><div className="test-top"><span><Terminal size={13}/>{t('tests')}</span><button className="demo-run" disabled={state==='running'} onClick={()=>{setState('running');timer.current=setTimeout(()=>setState('done'),550);}}><Play size={11}/>{state==='running'?t('running'):t('run')}</button></div>
            <div className={`test-tab ${state==='done'?'passed':''}`}>{state==='done'?<Check size={12}/>:<span className="neutral-dot"/>}sample-1</div>
            <div className="test-values"><div><span>{t('input')}</span><pre>{item.input}</pre></div><div><span>{t('actual')}</span><pre className={state==='done'?'success-text':''}>{state==='done'?item.output:'—'}</pre></div></div>
            <div aria-live="polite" className="demo-state">{state==='done' ? <><Check size={12}/>{t('passed')}<span>· {t('runNote')}</span></> : t('runNote')}</div>
          </div>
        </div>
      </div>
      <div className="editor-status"><span>✓ ACStride</span><span>{language==='cpp'?'C++20':'Python 3'} <span>UTF-8</span></span></div>
    </div><figcaption><span className="tiny-dot"/>{t('label')}</figcaption>
  </figure>;
}
