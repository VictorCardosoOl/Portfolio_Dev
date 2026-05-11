https://hashtagtecnologia.com.br/#web

CHat na palavra Formosa no footer, por favor coloque o efeito abaixo no texto:
import DecryptedText from './DecryptedText';

{/_ Example 1: Defaults (hover to decrypt) _/}
<DecryptedText text="Hover me!" />

{/_ Example 2: Customized speed and characters _/}
<DecryptedText
text="Customize me"
speed={60}
maxIterations={10}
characters="ABCD1234!?"
className="revealed"
parentClassName="all-letters"
encryptedClassName="encrypted"
/>

{/_ Example 3: Click to decrypt (toggle mode) _/}
<DecryptedText
text="Click to decrypt"
animateOn="view"
clickMode="once"
/>

{/_ Example 4: Animate on view (runs once) _/}

<div style={{ marginTop: '4rem' }}>
  <DecryptedText
  text="This text animates when in view"
  revealDirection="start"
  sequential
  useOriginalCharsOnly={false}
/>
</div>

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';

const styles = {
wrapper: {
display: 'inline-block',
whiteSpace: 'pre-wrap'
},
srOnly: {
position: 'absolute',
width: '1px',
height: '1px',
padding: 0,
margin: '-1px',
overflow: 'hidden',
clip: 'rect(0,0,0,0)',
border: 0
}
};

export default function DecryptedText({
text,
speed = 50,
maxIterations = 10,
sequential = false,
revealDirection = 'start',
useOriginalCharsOnly = false,
characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&\*()\_+',
className = '',
parentClassName = '',
encryptedClassName = '',
animateOn = 'hover',
clickMode = 'once',
...props
}) {
const [displayText, setDisplayText] = useState(text);
const [isAnimating, setIsAnimating] = useState(false);
const [revealedIndices, setRevealedIndices] = useState(new Set());
const [hasAnimated, setHasAnimated] = useState(false);
const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click');
const [direction, setDirection] = useState('forward');

const containerRef = useRef(null);
const orderRef = useRef([]);
const pointerRef = useRef(0);
const intervalRef = useRef(null);

const availableChars = useMemo(() => {
return useOriginalCharsOnly
? Array.from(new Set(text.split(''))).filter(char => char !== ' ')
: characters.split('');
}, [useOriginalCharsOnly, text, characters]);

const shuffleText = useCallback(
(originalText, currentRevealed) => {
return originalText
.split('')
.map((char, i) => {
if (char === ' ') return ' ';
if (currentRevealed.has(i)) return originalText[i];
return availableChars[Math.floor(Math.random() * availableChars.length)];
})
.join('');
},
[availableChars]
);

const computeOrder = useCallback(
len => {
const order = [];
if (len <= 0) return order;
if (revealDirection === 'start') {
for (let i = 0; i < len; i++) order.push(i);
return order;
}
if (revealDirection === 'end') {
for (let i = len - 1; i >= 0; i--) order.push(i);
return order;
}
// center
const middle = Math.floor(len / 2);
let offset = 0;
while (order.length < len) {
if (offset % 2 === 0) {
const idx = middle + offset / 2;
if (idx >= 0 && idx < len) order.push(idx);
} else {
const idx = middle - Math.ceil(offset / 2);
if (idx >= 0 && idx < len) order.push(idx);
}
offset++;
}
return order.slice(0, len);
},
[revealDirection]
);

const fillAllIndices = useCallback(() => {
const s = new Set();
for (let i = 0; i < text.length; i++) s.add(i);
return s;
}, [text]);

const removeRandomIndices = useCallback((set, count) => {
const arr = Array.from(set);
for (let i = 0; i < count && arr.length > 0; i++) {
const idx = Math.floor(Math.random() \* arr.length);
arr.splice(idx, 1);
}
return new Set(arr);
}, []);

const encryptInstantly = useCallback(() => {
const emptySet = new Set();
setRevealedIndices(emptySet);
setDisplayText(shuffleText(text, emptySet));
setIsDecrypted(false);
}, [text, shuffleText]);

const triggerDecrypt = useCallback(() => {
if (sequential) {
orderRef.current = computeOrder(text.length);
pointerRef.current = 0;
setRevealedIndices(new Set());
} else {
setRevealedIndices(new Set());
}
setDirection('forward');
setIsAnimating(true);
}, [sequential, computeOrder, text.length]);

const triggerReverse = useCallback(() => {
if (sequential) {
// compute forward order then reverse it: we'll remove indices in that order
orderRef.current = computeOrder(text.length).slice().reverse();
pointerRef.current = 0;
setRevealedIndices(fillAllIndices()); // start fully revealed
setDisplayText(shuffleText(text, fillAllIndices()));
} else {
// non-seq: start from fully revealed as well
setRevealedIndices(fillAllIndices());
setDisplayText(shuffleText(text, fillAllIndices()));
}
setDirection('reverse');
setIsAnimating(true);
}, [sequential, computeOrder, fillAllIndices, shuffleText, text]);

useEffect(() => {
if (!isAnimating) return;

    let currentIteration = 0;

    const getNextIndex = revealedSet => {
      const textLength = text.length;
      switch (revealDirection) {
        case 'start':
          return revealedSet.size;
        case 'end':
          return textLength - 1 - revealedSet.size;
        case 'center': {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }

          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices(prevRevealed => {
        if (sequential) {
          // Forward
          if (direction === 'forward') {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, newRevealed));
              return newRevealed;
            } else {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(true);
              return prevRevealed;
            }
          }
          // Reverse
          if (direction === 'reverse') {
            if (pointerRef.current < orderRef.current.length) {
              const idxToRemove = orderRef.current[pointerRef.current++];
              const newRevealed = new Set(prevRevealed);
              newRevealed.delete(idxToRemove);
              setDisplayText(shuffleText(text, newRevealed));
              if (newRevealed.size === 0) {
                clearInterval(intervalRef.current);
                setIsAnimating(false);
                setIsDecrypted(false);
              }
              return newRevealed;
            } else {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(false);
              return prevRevealed;
            }
          }
        } else {
          // Non-Sequential
          if (direction === 'forward') {
            setDisplayText(shuffleText(text, prevRevealed));
            currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setDisplayText(text);
              setIsDecrypted(true);
            }
            return prevRevealed;
          }

          // Non-Sequential Reverse
          if (direction === 'reverse') {
            let currentSet = prevRevealed;
            if (currentSet.size === 0) {
              currentSet = fillAllIndices();
            }
            const removeCount = Math.max(1, Math.ceil(text.length / Math.max(1, maxIterations)));
            const nextSet = removeRandomIndices(currentSet, removeCount);
            setDisplayText(shuffleText(text, nextSet));
            currentIteration++;
            if (nextSet.size === 0 || currentIteration >= maxIterations) {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(false);
              // ensure final scrambled state
              setDisplayText(shuffleText(text, new Set()));
              return new Set();
            }
            return nextSet;
          }
        }
        return prevRevealed;
      });
    }, speed);

    return () => clearInterval(intervalRef.current);

}, [
isAnimating,
text,
speed,
maxIterations,
sequential,
revealDirection,
shuffleText,
direction,
fillAllIndices,
removeRandomIndices,
characters,
useOriginalCharsOnly
]);

/_ Click Behaviour _/
const handleClick = () => {
if (animateOn !== 'click') return;

    if (clickMode === 'once') {
      if (isDecrypted) return;
      setDirection('forward');
      triggerDecrypt();
    }

    if (clickMode === 'toggle') {
      if (isDecrypted) {
        triggerReverse();
      } else {
        setDirection('forward');
        triggerDecrypt();
      }
    }

};

/_ Hover Behaviour _/
const triggerHoverDecrypt = useCallback(() => {
if (isAnimating) return;

    setRevealedIndices(new Set());
    setIsDecrypted(false);
    setDisplayText(text);
    setDirection('forward');
    setIsAnimating(true);

}, [isAnimating, text]);

const resetToPlainText = useCallback(() => {
clearInterval(intervalRef.current);
setIsAnimating(false);
setRevealedIndices(new Set());
setDisplayText(text);
setIsDecrypted(true);
setDirection('forward');
}, [text]);

/_ View Observer _/
useEffect(() => {
if (animateOn !== 'view' && animateOn !== 'inViewHover') return;

    const observerCallback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          triggerDecrypt();
          setHasAnimated(true);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };

}, [animateOn, hasAnimated, triggerDecrypt]);

useEffect(() => {
if (animateOn === 'click') {
encryptInstantly();
} else {
setDisplayText(text);
setIsDecrypted(true);
}
setRevealedIndices(new Set());
setDirection('forward');
}, [animateOn, text, encryptInstantly]);

const animateProps =
animateOn === 'hover' || animateOn === 'inViewHover'
? {
onMouseEnter: triggerHoverDecrypt,
onMouseLeave: resetToPlainText
}
: animateOn === 'click'
? {
onClick: handleClick
}
: {};

return (
<motion.span className={parentClassName} ref={containerRef} style={styles.wrapper} {...animateProps} {...props}>
<span style={styles.srOnly}>{displayText}</span>

      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || (!isAnimating && isDecrypted);

          return (
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>

);
}

---

import TextType from './TextType';

<TextType
text={["Text typing effect", "for your websites", "Happy coding!"]}
typingSpeed={75}
pauseDuration={1500}
showCursor
cursorCharacter="\_"
texts={["Welcome to React Bits! Good to see you!","Build some amazing experiences!"]}
deletingSpeed={50}
variableSpeedEnabled={false}
variableSpeedMin={60}
variableSpeedMax={120}
cursorBlinkDuration={0.5}
/>
'use client';

import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

const TextType = ({
text,
as: Component = 'div',
typingSpeed = 50,
initialDelay = 0,
pauseDuration = 2000,
deletingSpeed = 30,
loop = true,
className = '',
showCursor = true,
hideCursorWhileTyping = false,
cursorCharacter = '|',
cursorClassName = '',
cursorBlinkDuration = 0.5,
textColors = [],
variableSpeed,
onSentenceComplete,
startOnVisible = false,
reverseMode = false,
...props
}) => {
const [displayedText, setDisplayedText] = useState('');
const [currentCharIndex, setCurrentCharIndex] = useState(0);
const [isDeleting, setIsDeleting] = useState(false);
const [currentTextIndex, setCurrentTextIndex] = useState(0);
const [isVisible, setIsVisible] = useState(!startOnVisible);
const cursorRef = useRef(null);
const containerRef = useRef(null);

const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

const getRandomSpeed = useCallback(() => {
if (!variableSpeed) return typingSpeed;
const { min, max } = variableSpeed;
return Math.random() \* (max - min) + min;
}, [variableSpeed, typingSpeed]);

const getCurrentTextColor = () => {
if (textColors.length === 0) return 'inherit';
return textColors[currentTextIndex % textColors.length];
};

useEffect(() => {
if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();

}, [startOnVisible]);

useEffect(() => {
if (showCursor && cursorRef.current) {
gsap.set(cursorRef.current, { opacity: 1 });
gsap.to(cursorRef.current, {
opacity: 0,
duration: cursorBlinkDuration,
repeat: -1,
yoyo: true,
ease: 'power2.inOut'
});
}
}, [showCursor, cursorBlinkDuration]);

useEffect(() => {
if (!isVisible) return;

    let timeout;
    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(prev => prev + processedText[currentCharIndex]);
              setCurrentCharIndex(prev => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length >= 1) {
          if (!loop && currentTextIndex === textArray.length - 1) return;
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps

}, [
currentCharIndex,
displayedText,
isDeleting,
typingSpeed,
deletingSpeed,
pauseDuration,
textArray,
currentTextIndex,
loop,
initialDelay,
isVisible,
reverseMode,
variableSpeed,
onSentenceComplete
]);

const shouldHideCursor =
hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

return createElement(
Component,
{
ref: containerRef,
className: `text-type ${className}`,
...props
},
<span className="text-type**content" style={{ color: getCurrentTextColor() || 'inherit' }}>
{displayedText}
</span>,
showCursor && (
<span
ref={cursorRef}
className={`text-type**cursor ${cursorClassName} ${shouldHideCursor ? 'text-type\_\_cursor--hidden' : ''}`} >
{cursorCharacter}
</span>
)
);
};

export default TextType;
.text-type {
display: inline-block;
white-space: pre-wrap;
}

.text-type\_\_cursor {
margin-left: 0.25rem;
display: inline-block;
opacity: 1;
}

.text-type\_\_cursor--hidden {
display: none;
}

---

https://akaru.fr/
https://koto.com/ - Portifolio particular
