export const INITIAL_ARTICLES = [
  // Primary Featured Article (Screen 4)
  {
    id: 'rsc-streaming-2025',
    slug: 'mastering-react-server-components-streaming-architecture-2025',
    title: 'Mastering React Server Components & Streaming Architecture in 2025',
    subtitle: 'How modern distributed frontends leverage granular boundary hydration, zero-bundle overhead primitives, and concurrent edge nodes to dramatically minimize Cumulative Layout Shift and Time-to-Interactive.',
    excerpt: 'How modern distributed frontends leverage granular boundary hydration, zero-bundle overhead primitives, and concurrent edge nodes to dramatically minimize Cumulative Layout Shift and Time-to-Interactive.',
    category: 'React',
    subCategory: 'React & Architecture',
    readTime: '7 min read',
    date: 'May 14, 2025',
    rfcNumber: 'RFC-104',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU1kD3w0z0HtiPPYdFrLNI9h5vb2FE3Ke2XLaT7Q-XPFf7bbjM4lMJzMJb6ZAi1fIUKad2MIQnIqiDd2C8zlh7QRmNdtrqoO5PKuVvdnNAsz-2hw4NxsWcKHhe7mr1pHZpk2HIaUfiiL4rVVXqt6hGnKKputZylka6Di7QDTjItZiVueQOZcGevAUDRoIpDC-tPHE0lAczRkEzLfIHVPC2pf1bo7dabxQTe3_N2Fio8JgsdLRjnmrf',
    figureCaption: 'Figure 1: RSC Serialization Protocol & Suspense Pipeline',
    author: {
      name: 'Sarah Jenkins',
      role: 'Staff Frontend Eng',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnRxokzOlYjiyCrI_0AfI2-tafDoH_vN0ozoPMom2466KKFzfm2tvQMtJ7BB2_P-ZjduDvD-FClr4jS_JyLLwlKqfdokZzf1Gg0EsE0c9ehGemnJ5bDG33VJQShgNIhGKVQxxR787vu0gfyiW3dyVAoCwjaaYUqBTBxma2df-kbnW_RZ9P1hEiqE0fOTypnLTkRgLoC6wCqnzYDO2DkqPNmr7OSxZaAKC-DAEBxW_KR8Wjso3c0dw7',
      bio: 'Writing deep dives on distributed systems, compiler architecture, and WebAssembly integration. Maintainer of several open-source reactive streaming micro-libraries and frequent conference speaker.',
      github: 'github/sjenkins',
      twitter: '@sarah_arch',
      substack: 'Substack',
    },
    likes: 342,
    codeSnippet: {
      path: 'app/dashboard/analytics-stream.tsx',
      language: 'TSX',
      code: `// Edge-rendered Server Component with direct DB stream
import { Suspense } from 'react';
import { db } from '@/lib/database';
import { MetricSkeleton } from '@/components/skeletons';

export async function AnalyticsStream({ tenantId }: { tenantId: string }) {
  // Direct parallel queries run within edge colocation
  const metricsPromise = db.aggregates.findUnique({
    where: { tenantId },
    select: { reqPerSec: true, p99Latency: true, errorRate: true }
  });

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Suspense fallback={<MetricSkeleton />}>
        <RealtimeMetricsPayload promise={metricsPromise} />
      </Suspense>
    </section>
  );
}`
    },
    keyTakeaways: [
      {
        title: 'Decoupled Server Boundaries:',
        description: 'Prevent client-side bundle bloat by keeping computational libraries on backend edge sandboxes.'
      },
      {
        title: 'Granular Suspense Skeletons:',
        description: 'Stream essential structural chrome immediately while heavy microservices populate independently.'
      },
      {
        title: 'Instant Form Actions:',
        description: 'Execute mutations with automatic cache invalidation and optimistic rollbacks built into native web standards.'
      }
    ]
  },

  // Trending 1
  {
    id: 'react-server-actions-optimistic',
    slug: 'mastering-server-actions-optimistic-hooks',
    title: 'Mastering Server Actions & Optimistic Hooks Under Heavy Load',
    excerpt: 'An in-depth disassembly of how React 19 mutates state across distributed edge runtimes with deterministic rollback strategies.',
    category: 'React',
    subCategory: 'React 19',
    readTime: '8 min read',
    date: 'May 20, 2025',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo3RcyrCx3MEbhqK_2Y0JBKiZe6zFC-7EhccheOgkifUnLcwWB8jZIq9KJ0PVG_0a30vrJ3y_Vas-N2BqrYdsYF7OrGvWlLoCAije4Y-9kIN-NG5f9MoEzOVpBGygRWn9HEQebnw2Xak6rgwKIs6w95iYh-VnijDtvdzKlzXtCdjToe6HqqMDLQM_cNrNrDQDrRdBJaBI59mIsP1ZUfhq5lbpzsbQXgVnCAHxW9hAWwpiqums2k6WP',
    author: {
      name: 'Sophia Zhao',
      role: 'Edge Lead at Veloce',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8fBs2yqBAW4WAAxbNFKJ9ku3Ua-WqJcMvSl1VKErScVu5KyN8BgIZ-aXwHU_2pvfDZXJc-cU4wKDy-o3q78mMCVOYPlJOkhrpzGqbzHaxqZDFJT6-vh5-zNrraFkamsOnCiKphUnhKN49P_H37gNgHE5eRMU14tXgpJ9j7iA8U-WGrFLcqNzDc0Tbrx6yn-jJHww2ArQirbTAnyCCjBTEQ8TsZJTddvCLTGLvRwnsyEYrds0m9UkA',
      bio: 'Pioneering edge orchestration and optimistic transactional user interfaces.',
      github: 'github/sophiazhao',
      twitter: '@sophia_edge'
    },
    likes: 842,
    trending: true,
    gradientFrom: 'from-primary',
    gradientTo: 'to-primary-container'
  },

  // Trending 2
  {
    id: 'css-subgrid-container-queries',
    slug: 'subgrid-container-queries-anchor-positioning-2025',
    title: 'Subgrid, Container Queries, and Anchor Positioning in 2025',
    excerpt: 'Deconstructing legacy utility wrappers: why modern viewport-independent web primitives render heavy CSS-in-JS abstractions obsolete.',
    category: 'CSS',
    subCategory: 'CSS Architecture',
    readTime: '12 min read',
    date: 'May 19, 2025',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo0z2kuiLa-3lplvi-_0_b9T7glyu-Ns6vENsUTHx3WJFC8a-SAqGUkD_9oS3nEe5tzQj2OsGKryRTN9xQg9zOrY3Fl9NtdYuwPeYB9mGSPHCuhl9ZUceGvzCqPUcK7zY756WhYhfIt6o6jAd1s4yCyW1-_k8qmKAVVyQiYl_giPWcJ4ew8_zv9khCRX2O3Pmj8CJym4xEa5UVBrgw002OLTOQbV0nKimRDnEzutmkxyCY_t_NPZu5',
    author: {
      name: 'Elena Rostova',
      role: 'Design Systems Specialist',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqT8Jj4-g0Bq-Z63nYW0_rf1VexK68W7MqDJCdOe72X8Wtn4_xwfSyNFyoZf3BHbrLkqgsKxH-4jWfUUYglkqq334-64U6lPD_h-fgMV_c-VvphYuIAKMogsNyH59IyxPt-R58ry9afMsKJusmK6yYRhW8DbMsBKcxbSBBAdeMMQmWcm4oPUgiHEaFMa5Nu8oxI_MV7zEhEa4CmMhQfWfdqlmfgGT539HBzitkA6-JeuMapjRuJfRt',
      bio: 'Curating modern CSS architecture, design tokens, and fluid viewport primitives.',
      github: 'github/erostova',
      twitter: '@elena_css'
    },
    likes: 1210,
    trending: true,
    gradientFrom: 'from-tertiary',
    gradientTo: 'to-secondary'
  },

  // Trending 3
  {
    id: 'local-llm-copilots-neovim-vscode',
    slug: 'local-llm-copilots-neovim-vscode-monorepos',
    title: 'Local LLM Copilots Integrated Inside Neovim & VS Code Monorepos',
    excerpt: 'Benchmarking quantization performance with llama.cpp embeddings running entirely offline on Apple Silicon developer rigs.',
    category: 'AI Tooling',
    subCategory: 'AI Tooling',
    readTime: '15 min read',
    date: 'May 17, 2025',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKfxV6aaLf3EhX7ai2QDvQVnSrqoW0LE1mDLm227vkNYVbHd4Zdly8gAF7yrIbKo2YqS8QYrrwQI1yHG4G-eNbjbjtSAghnHWYH4-se5m2WGTLU_HUi1PZKRJS3P2efYLaeXSdmhuMUCiOyjhv-NlOfY1vDlw0m-KiVCpuGoh2spZu_yKzcvlKxyjSFgjmb6UrzXK69QkEJVNwJ_DltDs5lIJc7nqGvXmGhZ_MhkTkFar_TQ5ZGcEK',
    author: {
      name: 'Marcus Vance',
      role: 'Systems Architect',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQvu2xp0JkyYQsiNXsocVxG6QKbZrTte7kpEpmqgLLPm14CGGEx3a9BPjdGcBzBFS8yI4qvQ3XhgOf-IAQlqqv9IDNJsximn_OXrq5FL1IaTEJAFCyNsmSDpkTv1aqdglv8iPyN2OsmocPyzR3dF0vJDY93KOEIHlQz1bnCKd6HG01ZPfYF9eHYrBkgzihNNhii9MhaP1FQaHyImvM9MSU8jQiVuCwJzrUQmk1DMs2ncF9zdWvD6Zw',
      bio: 'Benchmarking offline LLM runtimes, zero-telemetry workflows, and memory-mapped models.',
      github: 'github/marcusvance',
      twitter: '@marcus_systems'
    },
    likes: 974,
    trending: true,
    gradientFrom: 'from-secondary',
    gradientTo: 'to-surface-bright'
  },

  // Latest Article 1 (Screen 1 Grid)
  {
    id: 'ts-const-type-parameters',
    slug: 'const-type-parameters-inferred-tuple-narrowing',
    title: 'Const Type Parameters and Inferred Tuple Narrowing Patterns',
    excerpt: 'How literal type parameter inference eliminates verbose `as const` annotations across high-throughput RPC interfaces.',
    category: 'TypeScript',
    subCategory: 'TS 5.8 Core',
    readTime: '6 min read',
    date: 'May 18, 2025',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo3RcyrCx3MEbhqK_2Y0JBKiZe6zFC-7EhccheOgkifUnLcwWB8jZIq9KJ0PVG_0a30vrJ3y_Vas-N2BqrYdsYF7OrGvWlLoCAije4Y-9kIN-NG5f9MoEzOVpBGygRWn9HEQebnw2Xak6rgwKIs6w95iYh-VnijDtvdzKlzXtCdjToe6HqqMDLQM_cNrNrDQDrRdBJaBI59mIsP1ZUfhq5lbpzsbQXgVnCAHxW9hAWwpiqums2k6WP',
    author: {
      name: 'Liam Chen',
      role: 'Staff Type Architect',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP5sIS_MrBSUaQE3IeXwbtTo0vfm0KEA5gNKXqTbf2UT4cgjb_od5y15FJXbaIvJbJV77dNGWO4o11_knGosseFT-qXYlIDa1etzWQhuoiepObu9_tB7x4tCWgM_jhIJsPM_Th_37XquJpEaP-TJ6B6Gr-1VMz_hKoGd69bKX-NncYfwiM3bvlf9rLpow6iL4sMa3Z-i3pqtHg-NlClLwb9WAT-9DcIQrztLwtJPicz6NSK3Kz36bC',
      github: 'github/liamchen',
      twitter: '@liam_types'
    },
    likes: 412
  },

  // Latest Article 2
  {
    id: 'nextjs-ppr-production',
    slug: 'ppr-partial-prerendering-enterprise-deployments',
    title: 'PPR (Partial Prerendering) in Enterprise Production Deployments',
    excerpt: 'Combining static shell streaming with personalized dynamic micro-slots without triggering re-render cascades.',
    category: 'Next.js',
    subCategory: 'App Router',
    readTime: '11 min read',
    date: 'May 16, 2025',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_Sji_QI5glRigZMl1sn_R_WDinOFc6fKe1Gdn8nJQgVSKAJEUyN_cQ_sjEOm71i6OTi2ovtTSoy5jrbUrgiwGX4Qr3pxgfWnQ-g_jAwJFAk0g9DyaoJjayPzecVkR3FNfgXuIPJjTi7eKlIoJxcrCSVZEYEj4W-7Ajj6g51rqov9cCw4rbNDlPRoLWxD6wGKYlcpjo9CObD-5iXzIZL8BBZ8sppR25B8WulGcMwGHOOm-44hKsB0V',
    author: {
      name: 'Rachel Kim',
      role: 'Senior Next.js Infrastructure',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz-fkdZE3G_YAK1W0e-ryNwFb158iCru80BW-F-N2fuHNsHOMgKCTd-ZVcGzfUXLXWvKwxG3RuokDKmz3m_FF7DOy-wI-ceppFpn4XgQsMEl4dBML1m7YGxymziw7NVisgrtcAtyZiehiFblcwnrcUsauaiNlqOVRj3a-L2J_1kRtnJ3eUuyUgDRs152rantTywtGg4trm_osDLoPfUXwVi9rLc3m1lXu7vhpp-CHSGLsW3u6HN1vT',
      github: 'github/rachelkim',
      twitter: '@rachel_next'
    },
    likes: 650
  },

  // Latest Article 3
  {
    id: 'performance-debugging-inp',
    slug: 'debugging-inp-long-tasks-60fps-micro-task-scheduling',
    title: 'Debugging INP: From Long Tasks to 60fps Micro-Task Scheduling',
    excerpt: 'Practical strategies using `scheduler.yield()` and prioritizing event loop dispatch to eliminate sluggish tap latency.',
    category: 'Performance',
    subCategory: 'Web Vitals',
    readTime: '7 min read',
    date: 'May 14, 2025',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8Qm1ix3tS4tdq10WTh11B-DawYGDTQtNNGwSZozh81jSKGXXYMsEV-GXwyGBK_soE8uscZfbRx_z0upkEqhpQB2FqopZti1VN0gtvWDgIsppxMDin1stb-p6tKOxicWYyqw6ii0Sz4-0wIK7qeJymm_A5zTSm1PTU-xzeuL2vxGi1ko9_8Tuit4BL5TCZCl8uJn2AcHXwIdDFSFaeGb1JJFoajYm9R73KY6VseHdQeRecwgdVfbNj',
    author: {
      name: 'David Miller',
      role: 'Web Vitals Lead',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqe30_6tiJQcETIv96HcSPwditA4YnCVShALbcKivV8YrFu9RV6X-IHflnFkTgfVY1yAoeaCv-MxJiU77ZCg6LMEeUG5OIDi2MudXs4s2kZX6iNqbv7JPGhMGf7RfsIbRmcgXqaeBFFIRKOhdDMTDOaS8RbULLya3-2fFUELL1Pbd-V9LS31k4_pTN66KHis4sFMNRY-kWw2198pRQ2YVPZYkM4Tb9S2IO3avZK3T5eIZFeNwhwZE-',
      github: 'github/davidmiller',
      twitter: '@david_perf'
    },
    likes: 528
  },

  // Latest Article 4
  {
    id: 'react-signals-vs-vdom',
    slug: 'why-signals-wont-replace-react-virtual-dom',
    title: "Why Signals Won't Replace React Virtual DOM: A Rigorous Benchmark",
    excerpt: 'Comparative analysis dissecting compiler passes, memory overhead during reconciliation, and garbage collection pauses.',
    category: 'React',
    subCategory: 'Signals vs VDOM',
    readTime: '9 min read',
    date: 'May 12, 2025',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_rHBqeV98GrHXJoId_xlyAyvVKe3cBdoqTR1jltidPeqwrvTpZ1q2hiLLR0mWwKo7qf6W7d49AVrC2elCrfkCoVc_243HZrzT5_Kb9JDmTWie3PiUKxBxRsT869szlRVo0kloTcKTlCiHc5ryQ1fhin-Gok9vpq66bok1JG_QclChi3mXh0WCVFEwksTqhUGqlthbkgU1x8mwKvulfdZ1y1aipPu-UNTjeLn1VVHlZ0CH8Qd7Ai8D',
    author: {
      name: 'Alex Rivera',
      role: 'Lead Architect',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeCTL9t2B9e7qAMbpyP-vyT4hJbKnJRmtHL38LVQ9qYh1-MRmmL30zd5d28jifir8COL0qZDIwHcgC2rA_BZReXKtFqs3r5AQ1P_9-LZUigF8hf7VtMmqIlZnrbo5yvVkUGfJN3PTugjjtQxddX_sOG_UMz2mgPCxXf6JdgyQ36RAbzmjowXzqtC6CET6xbBcUmLAS7_cwPDXwLOrbwXlyc8HPbPSreu-im1Xv6r8jZZUE8DI6n60T',
      github: 'github/alexrivera',
      twitter: '@alex_rivera'
    },
    likes: 789
  },

  // Latest Article 5
  {
    id: 'career-pragmatic-path-to-principal',
    slug: 'pragmatic-path-to-principal-writing-rfcs-that-ship',
    title: 'The Pragmatic Path to Principal: Writing RFCs That Actually Ship',
    excerpt: 'Moving past endless consensus paralysis. How to build cross-team alignment through concise proof-of-concept specifications.',
    category: 'Career',
    subCategory: 'Staff+ Engineering',
    readTime: '14 min read',
    date: 'May 09, 2025',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB-cruSyg8LwTdvpJGV9GJmHZAUL8Ra2X21nS8cYesbIGEqm0VEFc9nNtmxSYZDeafRsqONXkVsyDvsjIQY8fiJx5J7C_31n26C5brbrQbndjkcvclY_R9CxDqb2Z1aJKKcJEM4D0qUjPY9amoj25hncV2uNZyGRLEzIfpl760UlalDW-DCKKbcRQEMIM8aOBXR4V0wRFDeHBMnK_qYiPmecbh-1XGs1_npR2B3ki1OX42PhPQoIox',
    author: {
      name: 'Sarah Jenkins',
      role: 'Staff Frontend Architect',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8oByfPheU1X3cvClEd5eTIDreE7BYDUtbCn9uvXimSmKryMUR6yY-w8oTmIviqx801eBou3zPshnnuMfN6_FJuFTCxgvdVCOVGzSTBPybEH1giEpD-Cnwk5gAbXoGvCOdLeMst6yN3e-iaSKwIK5nHK8fTl4I9qdFPzFilJmgZABvrpg0G5dKIKoJWId7hprHyfebWx2WsqB5iH_tKhPqDpl0xIIhLBMN0zFmVt43Dkxf3uwoZujE',
      github: 'github/sjenkins',
      twitter: '@sarah_arch'
    },
    likes: 1420
  },

  // Latest Article 6
  {
    id: 'css-zero-runtime-tokens',
    slug: 'zero-runtime-design-tokens-css-custom-properties-layers',
    title: 'Zero-Runtime Design Tokens with CSS Custom Properties and Cascade Layers',
    excerpt: 'Building bulletproof theming engines with `@layer` priority declarations that avoid specificity wars in design systems.',
    category: 'CSS',
    subCategory: 'CSS Modules & Tokens',
    readTime: '5 min read',
    date: 'May 06, 2025',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo0z2kuiLa-3lplvi-_0_b9T7glyu-Ns6vENsUTHx3WJFC8a-SAqGUkD_9oS3nEe5tzQj2OsGKryRTN9xQg9zOrY3Fl9NtdYuwPeYB9mGSPHCuhl9ZUceGvzCqPUcK7zY756WhYhfIt6o6jAd1s4yCyW1-_k8qmKAVVyQiYl_giPWcJ4ew8_zv9khCRX2O3Pmj8CJym4xEa5UVBrgw002OLTOQbV0nKimRDnEzutmkxyCY_t_NPZu5',
    author: {
      name: 'Taro Yamada',
      role: 'Systems Designer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIc0oPTB6l5SWI_2BGucHnztEKFZXGm9Fo6FNtiRp2zJYyoaO-fRUaMYSexd8hbEta_0elKbCYRpmKPrdvED7Pl6QFbnhtFXYc1HjPhySKFDiKXvqPel1mGugxB3RDyfNT0csyyaUGCwrEvYp9st20MBcs226UNMJTg25Kb4YeWZ2KyhU3MhlBjh5P3zmkRuhRrYi-7kMb2_8zCtpSV2RH1PgnOGtnD4GzeCxml8MYT7999GpWWRBM',
      github: 'github/taroyamada',
      twitter: '@taro_design'
    },
    likes: 367
  },

  // Related Deep Dive 1
  {
    id: 'distributed-state-durable-objects',
    slug: 'distributed-state-coordination-durable-objects',
    title: 'Distributed State Coordination with Durable Objects & Workers',
    excerpt: 'Eliminating global locking mechanisms through regional partitioned actors and optimistic state synchronization algorithms.',
    category: 'Cloud Architecture',
    subCategory: 'Edge Infrastructure',
    readTime: '11 min read',
    date: 'Apr 28, 2025',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKfxV6aaLf3EhX7ai2QDvQVnSrqoW0LE1mDLm227vkNYVbHd4Zdly8gAF7yrIbKo2YqS8QYrrwQI1yHG4G-eNbjbjtSAghnHWYH4-se5m2WGTLU_HUi1PZKRJS3P2efYLaeXSdmhuMUCiOyjhv-NlOfY1vDlw0m-KiVCpuGoh2spZu_yKzcvlKxyjSFgjmb6UrzXK69QkEJVNwJ_DltDs5lIJc7nqGvXmGhZ_MhkTkFar_TQ5ZGcEK',
    author: {
      name: 'Elena Vance',
      role: 'Community Director',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMc-gFPMWjsTJRomSFZ6TjvR3svrQz3IF6jbxP3FOoMvWlxydnEHNx8UpSclX_SqRKGv2DpLRzMjxpaux2IUVlY5iQzV3Zo6xv1AddmShuIGjOLA20WyBLKS6-yn9HRyE89KheUQmeKEdbkKQvRG8nYbbEzN0yDnjKxCd0ecZ2GAB3hg2GCjc9NP8unRykA4wNmw3wiEWZooAVi0yHVvA9ORDw0BeeD-pH00Zmrn-4Ow4J-5Onfwjg',
      github: 'github/elenavance',
      twitter: '@elena_vance'
    },
    likes: 812
  },

  // Related Deep Dive 2
  {
    id: 'demystifying-type-level-metaprogramming',
    slug: 'demystifying-type-level-metaprogramming-monorepos',
    title: 'Demystifying Type-Level Metaprogramming in Complex Monorepos',
    excerpt: 'Crafting expressive recursive conditional types without crashing the TypeScript language server during large continuous compilation jobs.',
    category: 'TypeScript',
    subCategory: 'TypeScript & Compilers',
    readTime: '9 min read',
    date: 'Apr 21, 2025',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1p3NU71Xz6s8afftxOQFEaUFJIskOL0pWSM51gvI_vnC8NyVo4_k5EDqV3rALVn4v2bfSJaRk21KwrE0cN_NqPjVWSucrBb8zqeaTlxch0EN43FcgOY9t2e2qdh69JtoIeZfWaE4thHQ949Cx8yYqaBo0qrz57PHjWM6XEt-k6WHpFmS-6gYx3K7jbWT_RaVgk-DlTKH-5QYAp-YaERN69UzARHhkqjmxamB9imLdBTafV1YgeLPM',
    author: {
      name: 'Marcus Chen',
      role: 'Staff Technical Writer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjcz-Lcv6d0V_To8P5KkmQWqRgU9TgFDe-ulFx9J3fxWxSSr3AoKIoCGMS9tt4UuQcIzdbWyJVqEUTRbvLuMAhJWR3EwcbAwtMUnCbFU6xHQebcyA7ZvjSRCWfecfxqM6HXxwLPwe7PS81v8bHcAL_jg2IoZeahoR7TdbBifLj2XfQmUIadJ45AKixVITSd3UT1suySaRb9Vk4XUxnWk0u3HltNzjxaHloEng-YbfQTwQTYYXQ7V7q',
      github: 'github/marcuschen',
      twitter: '@marcus_chen'
    },
    likes: 934
  }
];

export const CORE_TEAM_MEMBERS = [
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    role: 'Lead Architect',
    bio: 'Ex-distributed systems infra engineer. Obsessed with low-latency event brokers, consensus protocols, and Linux kernel traces.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq5-3N8SOSzhi-Ho3ZtVmMRlGztzF3tcYvh9KqFfsGLr1dANs5XlSupD-9OuIf4vKn6j4Ve-LNn9wgIwkap17zRqi7J2zW0QuyMZSDfXMJGiLLYBLnp2RTMVpcG5kn8S9nmSOCYO8OSxgsYit6h4mPNa7hGLPoVYHs8Cdx0WhNcnBAljfsSb8x1Ho2wFQNSouAMpE6RrBf8E9sNWNZbaDFrOJpNnO-d6210tfJqArRDc5gPCc_bTms',
    github: 'github/alexrivera',
    twitter: '@alex_rivera',
    icon: 'memory'
  },
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    role: 'Community Director',
    bio: 'Coordinates RFCs, maintains developer working groups, and leads code review cohorts across our decentralized editor community.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMc-gFPMWjsTJRomSFZ6TjvR3svrQz3IF6jbxP3FOoMvWlxydnEHNx8UpSclX_SqRKGv2DpLRzMjxpaux2IUVlY5iQzV3Zo6xv1AddmShuIGjOLA20WyBLKS6-yn9HRyE89KheUQmeKEdbkKQvRG8nYbbEzN0yDnjKxCd0ecZ2GAB3hg2GCjc9NP8unRykA4wNmw3wiEWZooAVi0yHVvA9ORDw0BeeD-pH00Zmrn-4Ow4J-5Onfwjg',
    github: 'github/elenavance',
    twitter: '@elena_vance',
    icon: 'hub'
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'Staff Technical Writer',
    bio: 'Compiler enthusiast and WebAssembly specialist. Breaks down abstract type theory and browser internals into pragmatic engineering guides.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjcz-Lcv6d0V_To8P5KkmQWqRgU9TgFDe-ulFx9J3fxWxSSr3AoKIoCGMS9tt4UuQcIzdbWyJVqEUTRbvLuMAhJWR3EwcbAwtMUnCbFU6xHQebcyA7ZvjSRCWfecfxqM6HXxwLPwe7PS81v8bHcAL_jg2IoZeahoR7TdbBifLj2XfQmUIadJ45AKixVITSd3UT1suySaRb9Vk4XUxnWk0u3HltNzjxaHloEng-YbfQTwQTYYXQ7V7q',
    github: 'github/marcuschen',
    twitter: '@marcus_chen',
    icon: 'edit_note'
  },
  {
    id: 'kavita-sharma',
    name: 'Kavita Sharma',
    role: 'Head of Research',
    bio: 'Investigates memory-safe runtimes, supply chain integrity, and cryptographic primitives. Curates our zero-day post-mortem series.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGMmELqgGJ5RJ_YkPjejSkhP11PdK6TZUr0VpvX6GjQCzHEgslrAR25X4SVs-zS9u-6aAYraDICteEPTreYtnbnjKDQ2Y5WLIv60vjv4erK4RiT6x5mOG6l33QZppRtawaczPjNrVN3vBTxAyfggNT0W7jRZj8tP6etem7j-4PlToTk454uIVouEj-gYcBV6KhqujHTrnIjfPAj2y-yAwp0ohiWnunkbmoBJ4fNy98Upb_72I9COMJ',
    github: 'github/kavitasharma',
    twitter: '@kavita_sec',
    icon: 'security'
  }
];

export const CATEGORIES_WITH_COUNTS = [
  { name: 'React & RSC', filterKey: 'React', count: 42 },
  { name: 'TypeScript Core', filterKey: 'TypeScript', count: 88 },
  { name: 'CSS & Design Systems', filterKey: 'CSS', count: 29 },
  { name: 'Cloud Architecture', filterKey: 'Cloud Architecture', count: 51 }
];
