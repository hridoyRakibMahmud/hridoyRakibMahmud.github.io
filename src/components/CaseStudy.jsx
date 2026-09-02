import Icon from './Icon.jsx';

export default function CaseStudy({ project }) {
  const { title, tag, stack, blocks, scope, icon, repoUrl } = project;

  return (
    <article className="case">
      <div className="case__meta">
        <Icon name={icon} />
        {tag && <span className="tag">{tag}</span>}
        <p className="case__stack">
          {stack.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>

      <div className="case__body">
        <h3>{title}</h3>

        {blocks.map((block) => (
          <div className="block" key={block.label}>
            <span className="label">{block.label}</span>
            {block.items ? (
              <ul>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{block.text}</p>
            )}
          </div>
        ))}

        {scope && <p className="scope">{scope}</p>}
        {repoUrl && (
          <a className="case__repo" href={repoUrl} target="_blank" rel="noopener">
            View source on GitHub &#8594;
          </a>
        )}
      </div>
    </article>
  );
}
